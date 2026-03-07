import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/lib/admin-auth';
import { buildReferralTree } from '@/lib/referrals';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tree = await buildReferralTree(user.id);

    return NextResponse.json({ tree });
  } catch (error) {
    console.error('Referral tree error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
