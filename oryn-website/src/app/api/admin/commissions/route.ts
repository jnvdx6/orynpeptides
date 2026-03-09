import { NextRequest, NextResponse } from 'next/server';
import { getCommissions, updateCommission, updateUser, getUsers } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { Commission, CommissionStatus } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as CommissionStatus | null;
    const userId = searchParams.get('userId');

    let commissions = await getCommissions();

    if (status) {
      commissions = commissions.filter((c: Commission) => c.status === status);
    }

    if (userId) {
      commissions = commissions.filter(
        (c: Commission) => c.beneficiaryId === userId
      );
    }

    // Sort by newest first
    commissions.sort(
      (a: Commission, b: Commission) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ commissions });
  } catch (error) {
    console.error('Admin commissions GET error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commissionId, status } = await request.json();

    if (!commissionId || !status) {
      return NextResponse.json(
        { error: 'Commission ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses: CommissionStatus[] = ['pending', 'approved', 'paid', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updates: Partial<Commission> = { status };

    if (status === 'paid') {
      updates.paidAt = new Date().toISOString();

      // Update the beneficiary's balance when marking as paid
      const commissions = await getCommissions();
      const commission = commissions.find((c: Commission) => c.id === commissionId);
      if (commission) {
        const users = await getUsers();
        const beneficiary = users.find((u) => u.id === commission.beneficiaryId);
        if (beneficiary) {
          await updateUser(beneficiary.id, {
            totalEarnings: beneficiary.totalEarnings + commission.amount,
            availableBalance: beneficiary.availableBalance + commission.amount,
          });
        }
      }
    }

    const updatedCommission = await updateCommission(commissionId, updates);

    if (!updatedCommission) {
      return NextResponse.json(
        { error: 'Commission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ commission: updatedCommission });
  } catch (error) {
    console.error('Admin commissions PUT error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commissionIds, status } = await request.json();

    if (!Array.isArray(commissionIds) || commissionIds.length === 0 || !status) {
      return NextResponse.json(
        { error: 'Commission IDs array and status are required' },
        { status: 400 }
      );
    }

    const validStatuses: CommissionStatus[] = ['pending', 'approved', 'paid', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const results: Commission[] = [];
    const errors: string[] = [];

    for (const commissionId of commissionIds) {
      const updates: Partial<Commission> = { status };

      if (status === 'paid') {
        updates.paidAt = new Date().toISOString();

        // Update beneficiary balance
        const commissions = await getCommissions();
        const commission = commissions.find((c: Commission) => c.id === commissionId);
        if (commission) {
          const users = await getUsers();
          const beneficiary = users.find((u) => u.id === commission.beneficiaryId);
          if (beneficiary) {
            await updateUser(beneficiary.id, {
              totalEarnings: beneficiary.totalEarnings + commission.amount,
              availableBalance: beneficiary.availableBalance + commission.amount,
            });
          }
        }
      }

      const updated = await updateCommission(commissionId, updates);
      if (updated) {
        results.push(updated);
      } else {
        errors.push(`Commission ${commissionId} not found`);
      }
    }

    return NextResponse.json({
      updated: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Admin commissions bulk update error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
