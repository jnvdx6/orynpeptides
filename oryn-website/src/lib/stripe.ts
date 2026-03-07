import Stripe from 'stripe';

// Lazy-initialize Stripe to avoid build-time errors when STRIPE_SECRET_KEY is not set
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

// Backwards-compatible export — will throw at runtime if key not set, but won't crash build
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
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
