import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import {
  getOrders,
  updateOrder,
  getSettings,
  addCommission,
  addActivityLog,
} from '@/lib/db';
import { calculateCommissions } from '@/lib/referrals';
import { captureServerEvent } from '@/lib/posthog-server';
import type { Order } from '@/types';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Find the order by payment intent metadata or match by amount
      const orders = await getOrders();
      const referralCode = paymentIntent.metadata?.referralCode;
      const orderRef = paymentIntent.metadata?.orderRef;

      let matchedOrder: Order | undefined;
      if (orderRef) {
        matchedOrder = orders.find((o) => o.ref === orderRef);
      }
      if (!matchedOrder) {
        // Match by most recent pending order with similar amount
        const amountEur = paymentIntent.amount / 100;
        matchedOrder = orders
          .filter((o) => o.paymentStatus === 'pending' && Math.abs(o.total - amountEur) < 1)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      }

      if (matchedOrder) {
        // Update order status
        await updateOrder(matchedOrder.id, {
          paymentStatus: 'confirmed',
          status: 'processing',
        });

        // Generate commissions if referral code was used
        if (referralCode && !matchedOrder.commissionsGenerated) {
          try {
            const settings = await getSettings();
            const commissions = await calculateCommissions(
              { ...matchedOrder, referralCode } as Order,
              settings
            );
            for (const commission of commissions) {
              await addCommission(commission);
            }
            await updateOrder(matchedOrder.id, { commissionsGenerated: true });
          } catch (err) {
            console.error('Commission generation error:', err instanceof Error ? err.message : 'Unknown error');
          }
        }

        // PostHog server-side: payment confirmed
        captureServerEvent(matchedOrder.userId || "anonymous", "payment_confirmed_server", {
          order_ref: matchedOrder.ref,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          has_referral: !!referralCode,
        }).catch(() => {});

        // Log activity
        await addActivityLog({
          type: 'payment',
          action: 'payment_confirmed',
          description: `Payment confirmed for order ${matchedOrder.ref} - ${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`,
          metadata: {
            orderId: matchedOrder.id,
            orderRef: matchedOrder.ref,
            amount: paymentIntent.amount / 100,
            paymentIntentId: paymentIntent.id,
          },
          adminId: 'system',
        });
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Update order status if found
      const orderRef = paymentIntent.metadata?.orderRef;
      if (orderRef) {
        const orders = await getOrders();
        const order = orders.find((o) => o.ref === orderRef);
        if (order) {
          await updateOrder(order.id, {
            paymentStatus: 'failed',
          });

          captureServerEvent(order.userId || "anonymous", "payment_failed_server", {
            order_ref: order.ref,
            error: paymentIntent.last_payment_error?.message || "Unknown",
          }).catch(() => {});

          await addActivityLog({
            type: 'payment',
            action: 'payment_failed',
            description: `Payment failed for order ${order.ref}: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
            metadata: { orderId: order.id, orderRef: order.ref },
            adminId: 'system',
          });
        }
      }
      break;
    }

    case 'charge.succeeded':
      break;

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;

      // Handle refund - update order and cancel commissions
      const piId = charge.payment_intent as string;
      if (piId) {
        const orders = await getOrders();
        const order = orders.find((o) =>
          o.paymentStatus === 'confirmed' || o.status === 'processing'
        );
        if (order) {
          await updateOrder(order.id, {
            status: 'cancelled',
            paymentStatus: 'failed',
          });
          await addActivityLog({
            type: 'payment',
            action: 'payment_refunded',
            description: `Charge refunded for order ${order.ref}`,
            metadata: { orderId: order.id, chargeId: charge.id },
            adminId: 'system',
          });
        }
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
