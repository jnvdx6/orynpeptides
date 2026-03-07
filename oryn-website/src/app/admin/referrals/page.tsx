'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminGet } from '@/lib/admin-fetch';

interface ReferralNode {
  userId: string;
  userName: string;
  email: string;
  referralCode: string;
  level: number;
  totalReferrals: number;
  totalEarnings: number;
  joinedAt: string;
  children: ReferralNode[];
  expanded?: boolean;
}

interface ReferralStats {
  totalChains: number;
  avgDepth: number;
  mostActiveReferrer: string;
  mostActiveReferrals: number;
  totalEarnings: number;
}

const levelDotColors: Record<number, string> = {
  0: 'bg-oryn-orange',
  1: 'bg-blue-500',
  2: 'bg-emerald-500',
  3: 'bg-violet-500',
  4: 'bg-pink-500',
};

const levelPillColors: Record<number, string> = {
  0: 'bg-orange-50 text-oryn-orange',
  1: 'bg-blue-50 text-blue-600',
  2: 'bg-emerald-50 text-emerald-600',
  3: 'bg-violet-50 text-violet-600',
  4: 'bg-pink-50 text-pink-600',
};

// --- Stats calculation helpers ---

function countChains(nodes: ReferralNode[]): number {
  // A chain is a root-level node that has at least one child
  return nodes.filter((n) => n.children.length > 0).length;
}

function getMaxDepth(node: ReferralNode): number {
  if (node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(getMaxDepth));
}

function getAvgDepth(nodes: ReferralNode[]): number {
  if (nodes.length === 0) return 0;
  const depths = nodes.map(getMaxDepth);
  return depths.reduce((sum, d) => sum + d, 0) / depths.length;
}

function flattenNodes(nodes: ReferralNode[]): ReferralNode[] {
  const result: ReferralNode[] = [];
  const walk = (list: ReferralNode[]) => {
    for (const n of list) {
      result.push(n);
      walk(n.children);
    }
  };
  walk(nodes);
  return result;
}

function calcStats(trees: ReferralNode[]): ReferralStats {
  const all = flattenNodes(trees);
  const totalEarnings = all.reduce((s, n) => s + n.totalEarnings, 0);
  const totalChains = countChains(trees);
  const avgDepth = getAvgDepth(trees);

  let mostActiveReferrer = '-';
  let mostActiveReferrals = 0;
  for (const n of all) {
    if (n.totalReferrals > mostActiveReferrals) {
      mostActiveReferrals = n.totalReferrals;
      mostActiveReferrer = n.userName;
    }
  }

  return { totalChains, avgDepth, mostActiveReferrer, mostActiveReferrals, totalEarnings };
}

// --- Tree node component ---

function ReferralTreeNode({ node, toggleExpand }: { node: ReferralNode; toggleExpand: (id: string) => void }) {
  const hasChildren = node.children.length > 0;
  const isExpanded = node.expanded !== false;

  return (
    <div>
      <div
        className="border border-gray-200 rounded-lg p-3.5 mb-2 hover:border-gray-300 cursor-pointer transition-colors"
        onClick={() => hasChildren && toggleExpand(node.userId)}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {hasChildren ? (
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <div className="w-4" />
            )}
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${levelDotColors[node.level] || 'bg-gray-400'}`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{node.userName}</span>
              </div>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{node.referralCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-right">
            <div>
              <p className="text-xs text-gray-500">Earnings</p>
              <p className="text-xs font-mono text-gray-500">
                <span className="font-medium">EUR {node.totalEarnings.toFixed(2)}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Referrals</p>
              <p className="text-xs font-mono text-gray-500">
                <span className="font-medium">{node.totalReferrals}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-5 pl-4 border-l border-gray-200">
          {node.children.map((child) => (
            <ReferralTreeNode key={child.userId} node={child} toggleExpand={toggleExpand} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Main page ---

export default function AdminReferralsPage() {
  const [tree, setTree] = useState<ReferralNode[]>([]);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await adminGet<{ trees: ReferralNode[] }>('/api/admin/referrals');
        const trees = data.trees || [];
        setTree(trees);
        setStats(calcStats(trees));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load referral data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleExpand = useCallback((id: string) => {
    const toggle = (nodes: ReferralNode[]): ReferralNode[] =>
      nodes.map((n) => {
        if (n.userId === id) {
          return { ...n, expanded: n.expanded === false ? true : false };
        }
        return { ...n, children: toggle(n.children) };
      });
    setTree((prev) => toggle(prev));
  }, []);

  const filterTree = (nodes: ReferralNode[], query: string): ReferralNode[] => {
    if (!query) return nodes;
    const q = query.toLowerCase();
    const matches = (node: ReferralNode): boolean =>
      node.userName.toLowerCase().includes(q) ||
      node.email.toLowerCase().includes(q) ||
      node.referralCode.toLowerCase().includes(q) ||
      node.children.some(matches);
    return nodes.filter(matches).map((n) => ({
      ...n,
      expanded: true,
      children: filterTree(n.children, query),
    }));
  };

  const displayTree = filterTree(tree, search);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">Loading referral network...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Chains</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">{stats.totalChains}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Chain Depth</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">{stats.avgDepth.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Most Active Referrer</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">{stats.mostActiveReferrer}</p>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{stats.mostActiveReferrals} referrals</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earnings</p>
            <p className="text-xl font-semibold text-oryn-orange mt-1">EUR {stats.totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or referral code..."
          className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-all"
        />
      </div>

      {/* Level legend */}
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${levelPillColors[level]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${levelDotColors[level]}`} />
            Level {level}
          </span>
        ))}
      </div>

      {/* Tree */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {displayTree.length > 0 ? (
          displayTree.map((node) => (
            <ReferralTreeNode key={node.userId} node={node} toggleExpand={toggleExpand} />
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-8">
            {search ? 'No referral nodes matching your search.' : 'No referral data available.'}
          </div>
        )}
      </div>
    </div>
  );
}
