import crypto from 'crypto';
import type {
  Order,
  Commission,
  AdminSettings,
  ReferralNode,
  CommissionStatus,
} from '@/types';
import {
  getUsers,
  getUserById,
  getUserByReferralCode,
  getCommissionsByBeneficiary,
  getOrdersByUserId,
  addCommission,
  updateUser,
} from './db';

// ─── Commission calculation ─────────────────────────────────────────────────

/**
 * Calculate commissions for all levels up the referral chain for a given order.
 * Returns an array of Commission objects (not yet persisted).
 *
 * The order must have a referralCode set (the code used at checkout).
 * We walk up the referral tree from the referrer (the user whose code was used)
 * through their referrers, up to 5 levels.
 */
export async function calculateCommissions(
  order: Order,
  settings: AdminSettings
): Promise<Commission[]> {
  if (!order.referralCode) return [];

  const commissions: Commission[] = [];
  const rates = [
    settings.commissionRates.level1,
    settings.commissionRates.level2,
    settings.commissionRates.level3,
    settings.commissionRates.level4,
    settings.commissionRates.level5,
  ];

  // Find the user whose referral code was used
  const directReferrer = await getUserByReferralCode(order.referralCode);
  if (!directReferrer) return [];

  // Don't allow self-referral
  if (directReferrer.id === order.userId) return [];

  // Walk up the chain: the direct referrer is level 1,
  // their referrer is level 2, etc.
  let currentUserId: string | undefined = directReferrer.id;
  let level = 1;

  while (currentUserId && level <= 5) {
    const user = await getUserById(currentUserId);
    if (!user || !user.isActive) break;

    const percentage = rates[level - 1];
    if (percentage <= 0) {
      // If the rate for this level is 0, still continue up the chain
      // in case higher levels have rates (unlikely but flexible)
      level++;
      // Move to the next referrer in the chain
      if (user.referredBy) {
        const nextReferrer = await getUserByReferralCode(user.referredBy);
        currentUserId = nextReferrer?.id;
      } else {
        currentUserId = undefined;
      }
      continue;
    }

    const amount = Math.round((order.subtotal * percentage) / 100 * 100) / 100;

    const commission: Commission = {
      id: crypto.randomUUID(),
      orderId: order.id,
      orderRef: order.ref,
      beneficiaryId: user.id,
      sourceUserId: order.userId,
      level,
      percentage,
      amount,
      status: settings.autoApproveCommissions ? 'approved' : 'pending',
      createdAt: new Date().toISOString(),
    };

    commissions.push(commission);

    // Move up the chain
    level++;
    if (user.referredBy) {
      const nextReferrer = await getUserByReferralCode(user.referredBy);
      currentUserId = nextReferrer?.id;
      // Prevent self-referral loops
      if (currentUserId === order.userId) break;
    } else {
      currentUserId = undefined;
    }
  }

  return commissions;
}

/**
 * Persist calculated commissions and update user balances.
 */
export async function applyCommissions(commissions: Commission[]): Promise<void> {
  for (const commission of commissions) {
    await addCommission(commission);

    // If auto-approved, add to user's balance immediately
    if (commission.status === 'approved') {
      const user = await getUserById(commission.beneficiaryId);
      if (user) {
        await updateUser(user.id, {
          totalEarnings: Math.round((user.totalEarnings + commission.amount) * 100) / 100,
          availableBalance:
            Math.round((user.availableBalance + commission.amount) * 100) / 100,
        });
      }
    }
  }
}

// ─── Referral tree ──────────────────────────────────────────────────────────

/**
 * Build a referral tree for a given user, showing all users they have
 * referred (directly and indirectly) up to 5 levels deep.
 */
export async function buildReferralTree(
  userId: string,
  maxDepth: number = 5
): Promise<ReferralNode | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  const allUsers = await getUsers();

  async function buildNode(uid: string, level: number): Promise<ReferralNode> {
    const u = allUsers.find((usr) => usr.id === uid);
    if (!u) {
      return {
        userId: uid,
        userName: 'Unknown',
        email: '',
        referralCode: '',
        level,
        totalReferrals: 0,
        totalEarnings: 0,
        joinedAt: '',
        children: [],
      };
    }

    // Find direct referrals (users who used this user's referral code)
    const directReferrals = allUsers.filter(
      (other) => other.referredBy === u.referralCode
    );

    const children: ReferralNode[] = [];
    if (level < maxDepth) {
      for (const ref of directReferrals) {
        const childNode = await buildNode(ref.id, level + 1);
        children.push(childNode);
      }
    }

    // Count total referrals recursively
    const countReferrals = (node: ReferralNode): number => {
      let count = node.children.length;
      for (const child of node.children) {
        count += countReferrals(child);
      }
      return count;
    };

    const node: ReferralNode = {
      userId: u.id,
      userName: `${u.firstName} ${u.lastName}`,
      email: u.email,
      referralCode: u.referralCode,
      level,
      totalReferrals: directReferrals.length,
      totalEarnings: u.totalEarnings,
      joinedAt: u.createdAt,
      children,
    };

    // Update total referrals to include nested
    node.totalReferrals = countReferrals(node) + directReferrals.length;

    return node;
  }

  return buildNode(userId, 0);
}

// ─── Referral chain ─────────────────────────────────────────────────────────

/**
 * Get the chain of referrers for a user, up to 5 levels.
 * Returns an array of user IDs starting from the direct referrer.
 */
export async function getReferralChain(
  userId: string
): Promise<{ id: string; name: string; level: number }[]> {
  const user = await getUserById(userId);
  if (!user || !user.referredBy) return [];

  const chain: { id: string; name: string; level: number }[] = [];
  let currentCode: string | undefined = user.referredBy;
  let level = 1;

  while (currentCode && level <= 5) {
    const referrer = await getUserByReferralCode(currentCode);
    if (!referrer) break;

    chain.push({
      id: referrer.id,
      name: `${referrer.firstName} ${referrer.lastName}`,
      level,
    });

    currentCode = referrer.referredBy;
    level++;
  }

  return chain;
}

// ─── Referral stats ─────────────────────────────────────────────────────────

/**
 * Get referral statistics for a given user.
 */
export async function getReferralStats(userId: string): Promise<{
  directReferrals: number;
  totalNetworkSize: number;
  totalEarnings: number;
  pendingCommissions: number;
  approvedCommissions: number;
  paidCommissions: number;
  commissionsByLevel: { level: number; count: number; total: number }[];
}> {
  const user = await getUserById(userId);
  if (!user) {
    return {
      directReferrals: 0,
      totalNetworkSize: 0,
      totalEarnings: 0,
      pendingCommissions: 0,
      approvedCommissions: 0,
      paidCommissions: 0,
      commissionsByLevel: [],
    };
  }

  const allUsers = await getUsers();
  const commissions = await getCommissionsByBeneficiary(userId);

  // Count direct referrals
  const directReferrals = allUsers.filter(
    (u) => u.referredBy === user.referralCode
  ).length;

  // Count total network size (recursive)
  function countNetwork(referralCode: string): number {
    const referred = allUsers.filter((u) => u.referredBy === referralCode);
    let count = referred.length;
    for (const ref of referred) {
      count += countNetwork(ref.referralCode);
    }
    return count;
  }

  const totalNetworkSize = countNetwork(user.referralCode);

  // Commission stats
  const pendingCommissions = commissions
    .filter((c) => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0);

  const approvedCommissions = commissions
    .filter((c) => c.status === 'approved')
    .reduce((sum, c) => sum + c.amount, 0);

  const paidCommissions = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0);

  // Commissions grouped by level
  const levelMap = new Map<number, { count: number; total: number }>();
  for (const c of commissions) {
    const existing = levelMap.get(c.level) || { count: 0, total: 0 };
    existing.count++;
    existing.total = Math.round((existing.total + c.amount) * 100) / 100;
    levelMap.set(c.level, existing);
  }

  const commissionsByLevel = Array.from(levelMap.entries())
    .map(([level, data]) => ({ level, ...data }))
    .sort((a, b) => a.level - b.level);

  return {
    directReferrals,
    totalNetworkSize,
    totalEarnings: user.totalEarnings,
    pendingCommissions: Math.round(pendingCommissions * 100) / 100,
    approvedCommissions: Math.round(approvedCommissions * 100) / 100,
    paidCommissions: Math.round(paidCommissions * 100) / 100,
    commissionsByLevel,
  };
}
