import { NextRequest, NextResponse } from 'next/server';
import { stripe, PAYMENT_METHODS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = 'eur',
      items,
      shipping,
      referralCode,
      promoCode,
      cryptoDiscount,
    } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Amount in cents
    const amountInCents = Math.round(amount * 100);

    // Build line items description
    const description = items
      ?.map((i: { name: string; quantity: number }) => `${i.quantity}x ${i.name}`)
      .join(', ') || 'ORYN Peptide Labs Order';

    // Create PaymentIntent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      description,
      metadata: {
        referralCode: referralCode || '',
        promoCode: promoCode || '',
        cryptoDiscount: cryptoDiscount ? 'true' : 'false',
        items: JSON.stringify(
          items?.map((i: { id: string; name: string; quantity: number; price: number }) => ({
            id: i.id,
            name: i.name,
            qty: i.quantity,
            price: i.price,
          })) || []
        ),
      },
      shipping: shipping
        ? {
            name: `${shipping.firstName} ${shipping.lastName}`,
            phone: shipping.phone || undefined,
            address: {
              line1: shipping.address,
              city: shipping.city,
              postal_code: shipping.postalCode,
              country: shipping.country,
            },
          }
        : undefined,
      receipt_email: shipping?.email || undefined,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('Stripe create-payment-intent error:', error instanceof Error ? error.message : 'Unknown error');
    const message =
      error instanceof Error ? error.message : 'Failed to create payment';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
