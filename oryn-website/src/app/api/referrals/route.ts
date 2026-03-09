import { NextRequest, NextResponse } from 'next/server';
import { getUsers, getCommissions } from '@/lib/db';
import { verifyUser } from '@/lib/admin-auth';
import { getReferralStats } from '@/lib/referrals';
import type { User, Commission } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await verifyUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [users, commissions] = await Promise.all([
      getUsers(),
      getCommissions(),
    ]);

    // Get direct referrals (users who used this user's referral code)
    const directReferrals = users
      .filter((u: User) => u.referredBy === currentUser.referralCode)
      .map(({ password, ...rest }: User) => rest);

    // Get commissions earned by this user
    const userCommissions = commissions.filter(
      (c: Commission) => c.beneficiaryId === currentUser.id
    );

    const totalEarnings = userCommissions
      .filter((c: Commission) => c.status === 'paid')
      .reduce((sum: number, c: Commission) => sum + c.amount, 0);

    const pendingEarnings = userCommissions
      .filter((c: Commission) => c.status === 'pending' || c.status === 'approved')
      .reduce((sum: number, c: Commission) => sum + c.amount, 0);

    // Get stats from referral module
    const stats = await getReferralStats(currentUser.id);

    return NextResponse.json({
      referralCode: currentUser.referralCode,
      directReferrals,
      totalDirectReferrals: directReferrals.length,
      totalEarnings,
      pendingEarnings,
      availableBalance: currentUser.availableBalance,
      commissions: userCommissions,
      stats,
    });
  } catch (error) {
    console.error('Referrals error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
