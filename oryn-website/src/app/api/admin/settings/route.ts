import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { AdminSettings } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await getSettings();

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Admin settings GET error:', error instanceof Error ? error.message : 'Unknown error');
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

    const updates: Partial<AdminSettings> = await request.json();

    // Validate commission rates if provided
    if (updates.commissionRates) {
      const rates = updates.commissionRates;
      const levels = [rates.level1, rates.level2, rates.level3, rates.level4, rates.level5];

      for (const rate of levels) {
        if (typeof rate !== 'number' || rate < 0 || rate > 100) {
          return NextResponse.json(
            { error: 'Commission rates must be numbers between 0 and 100' },
            { status: 400 }
          );
        }
      }
    }

    // Validate crypto discount if provided
    if (updates.cryptoDiscount !== undefined) {
      if (
        typeof updates.cryptoDiscount !== 'number' ||
        updates.cryptoDiscount < 0 ||
        updates.cryptoDiscount > 100
      ) {
        return NextResponse.json(
          { error: 'Crypto discount must be a number between 0 and 100' },
          { status: 400 }
        );
      }
    }

    // Validate min payout amount if provided
    if (updates.minPayoutAmount !== undefined) {
      if (typeof updates.minPayoutAmount !== 'number' || updates.minPayoutAmount < 0) {
        return NextResponse.json(
          { error: 'Minimum payout amount must be a non-negative number' },
          { status: 400 }
        );
      }
    }

    const updatedSettings = await updateSettings(updates);

    return NextResponse.json({ settings: updatedSettings });
  } catch (error) {
    console.error('Admin settings PUT error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
