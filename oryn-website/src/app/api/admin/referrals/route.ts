import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import { buildReferralTree } from '@/lib/referrals';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      // Return tree for a specific user
      const tree = await buildReferralTree(userId);
      return NextResponse.json({ tree });
    }

    // Return all top-level referrers (users who weren't referred by anyone)
    const users = await getUsers();
    const topLevelUsers = users.filter((u) => !u.referredBy);

    const trees = await Promise.all(
      topLevelUsers.map((u) => buildReferralTree(u.id))
    );

    // Filter out users with no referrals for a cleaner view
    const activeTrees = trees.filter((t) => t && t.children && t.children.length > 0);

    return NextResponse.json({ trees: activeTrees });
  } catch (error) {
    console.error('Admin referrals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
