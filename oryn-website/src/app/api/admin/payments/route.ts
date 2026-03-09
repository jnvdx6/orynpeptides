import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { Order, CryptoCurrency } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await getOrders();
    const cryptoOrders = orders.filter(
      (o: Order) => o.paymentMethod === 'crypto' && o.cryptoPayment
    );

    // Sort by newest first
    cryptoOrders.sort(
      (a: Order, b: Order) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Calculate volume by currency
    const volumeByCurrency: Record<string, { amount: number; amountEur: number; count: number }> = {};
    const currencies: CryptoCurrency[] = ['BTC', 'ETH', 'USDT', 'SOL'];

    for (const currency of currencies) {
      const currencyOrders = cryptoOrders.filter(
        (o: Order) => o.cryptoPayment?.currency === currency
      );

      volumeByCurrency[currency] = {
        amount: currencyOrders.reduce(
          (sum: number, o: Order) => sum + (o.cryptoPayment?.amount || 0),
          0
        ),
        amountEur: currencyOrders.reduce(
          (sum: number, o: Order) => sum + (o.cryptoPayment?.amountEur || 0),
          0
        ),
        count: currencyOrders.length,
      };
    }

    const totalConfirmed = cryptoOrders.filter(
      (o: Order) => o.paymentStatus === 'confirmed'
    ).length;

    const totalPending = cryptoOrders.filter(
      (o: Order) => o.paymentStatus === 'pending'
    ).length;

    const totalExpired = cryptoOrders.filter(
      (o: Order) => o.paymentStatus === 'expired'
    ).length;

    const totalFailed = cryptoOrders.filter(
      (o: Order) => o.paymentStatus === 'failed'
    ).length;

    return NextResponse.json({
      orders: cryptoOrders,
      stats: {
        totalOrders: cryptoOrders.length,
        totalConfirmed,
        totalPending,
        totalExpired,
        totalFailed,
        volumeByCurrency,
      },
    });
  } catch (error) {
    console.error('Admin payments error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
