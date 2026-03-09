import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrder, getUsers, addCommission, getSettings } from '@/lib/db';
import { verifyUser } from '@/lib/admin-auth';
import { calculateCommissions } from '@/lib/referrals';
import type { Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, txHash } = await request.json();

    if (!orderId || !txHash) {
      return NextResponse.json(
        { error: 'Order ID and transaction hash are required' },
        { status: 400 }
      );
    }

    // Find the order
    const orders = await getOrders();
    const order = orders.find((o: Order) => o.id === orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.paymentStatus === 'confirmed') {
      return NextResponse.json(
        { error: 'Payment already confirmed' },
        { status: 400 }
      );
    }

    if (!order.cryptoPayment) {
      return NextResponse.json(
        { error: 'No crypto payment found for this order' },
        { status: 400 }
      );
    }

    // Check if payment has expired
    if (new Date(order.cryptoPayment.expiresAt) < new Date()) {
      await updateOrder(orderId, {
        paymentStatus: 'expired',
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { error: 'Payment has expired. Please create a new payment.' },
        { status: 400 }
      );
    }

    // Update order with confirmed payment
    await updateOrder(orderId, {
      paymentStatus: 'confirmed',
      status: 'processing',
      cryptoPayment: {
        ...order.cryptoPayment,
        txHash,
      },
      updatedAt: new Date().toISOString(),
    });

    // Generate commissions if a referral code was used
    if (order.referralCode && !order.commissionsGenerated) {
      try {
        const settings = await getSettings();
        const commissions = await calculateCommissions(
          order,
          settings
        );

        for (const commission of commissions) {
          await addCommission(commission);
        }

        await updateOrder(orderId, {
          commissionsGenerated: true,
          updatedAt: new Date().toISOString(),
        });
      } catch (commError) {
        console.error('Commission generation error:', commError instanceof Error ? commError.message : 'Unknown error');
        // Don't fail the payment verification if commission generation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
      order: {
        id: order.id,
        ref: order.ref,
        paymentStatus: 'confirmed',
        status: 'processing',
      },
    });
  } catch (error) {
    console.error('Crypto verify error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
