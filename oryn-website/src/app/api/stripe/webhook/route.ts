import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { captureServerEvent } from '@/lib/posthog-server';

/**
 * Stripe webhook handler.
 * Order management and commission generation are now handled by Medusa
 * (via order.placed subscriber). This webhook handles Stripe-specific events
 * and analytics tracking.
 */
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
      console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id} - ${paymentIntent.amount / 100} ${paymentIntent.currency}`);

      // Track in PostHog
      captureServerEvent("stripe-webhook", "payment_confirmed_server", {
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        payment_intent_id: paymentIntent.id,
        has_referral: !!paymentIntent.metadata?.referralCode,
      }).catch(() => {});
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id} - ${paymentIntent.last_payment_error?.message}`);

      captureServerEvent("stripe-webhook", "payment_failed_server", {
        payment_intent_id: paymentIntent.id,
        error: paymentIntent.last_payment_error?.message || "Unknown",
      }).catch(() => {});
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      console.log(`[Stripe Webhook] Charge refunded: ${charge.id}`);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
