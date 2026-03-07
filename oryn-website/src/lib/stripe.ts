import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// All payment methods supported by the account
export const PAYMENT_METHODS = [
  'card',
  'klarna',
  'affirm',
  'afterpay_clearpay',
  'amazon_pay',
  'cashapp',
  'link',
  'bancontact',
  'ideal',
  'eps',
  'giropay',
  'p24',
] as const;
