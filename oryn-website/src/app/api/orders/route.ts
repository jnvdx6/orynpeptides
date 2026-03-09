import { NextRequest, NextResponse } from 'next/server';
import {
  addOrder,
  getUserByReferralCode,
  getSettings,
  addCommission,
  updateOrder,
  getPromotionByCode,
  updatePromotion,
} from '@/lib/db';
import { generateOrderRef } from '@/lib/auth';
import { verifyUser } from '@/lib/admin-auth';
import { calculateCommissions } from '@/lib/referrals';
import type { Order, OrderItem, ShippingAddress, PaymentMethod } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, shipping, paymentMethod, referralCode, promoCode } = await request.json();

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    if (!shipping) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    if (!paymentMethod || !['card', 'crypto'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Valid payment method is required (card or crypto)' },
        { status: 400 }
      );
    }

    const settings = await getSettings();

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, item: OrderItem) => sum + item.price * item.quantity,
      0
    );

    // Shipping cost (standard by default)
    const shippingCost = settings.shippingRates.standard;

    // Apply promotion discount if applicable
    let discount = 0;
    let appliedPromoId: string | undefined;
    if (promoCode) {
      const promo = await getPromotionByCode(promoCode);
      if (promo && promo.status === 'active') {
        const now = new Date();
        const validDate = (!promo.validFrom || new Date(promo.validFrom) <= now) &&
                          (!promo.validTo || new Date(promo.validTo) >= now);
        const withinLimit = !promo.totalLimit || promo.usedCount < promo.totalLimit;
        const withinCustomerLimit = !promo.perCustomerLimit ||
          (promo.usedByCustomers[user.id] || 0) < promo.perCustomerLimit;
        const meetsMinimum = !promo.minOrderAmount || subtotal >= promo.minOrderAmount;

        if (validDate && withinLimit && withinCustomerLimit && meetsMinimum) {
          if (promo.discountType === 'percentage') {
            discount = Math.round(subtotal * (promo.discountValue / 100) * 100) / 100;
          } else {
            discount = promo.discountValue;
          }
          if (promo.maxDiscountAmount && discount > promo.maxDiscountAmount) {
            discount = promo.maxDiscountAmount;
          }
          if (discount > subtotal) discount = subtotal;
          appliedPromoId = promo.id;
        }
      }
    }

    // Apply crypto discount on top (on the already-discounted subtotal)
    let cryptoDiscount = 0;
    if (paymentMethod === 'crypto' && settings.cryptoEnabled && settings.cryptoDiscount > 0) {
      cryptoDiscount = Math.round((subtotal - discount) * (settings.cryptoDiscount / 100) * 100) / 100;
    }
    discount = Math.round((discount + cryptoDiscount) * 100) / 100;

    const total = Math.round((subtotal + shippingCost - discount) * 100) / 100;

    // Validate referral code if provided
    let validReferralCode: string | undefined;
    if (referralCode) {
      const referrer = await getUserByReferralCode(referralCode);
      if (referrer && referrer.id !== user.id && referrer.isActive) {
        validReferralCode = referralCode;
      }
    }

    const orderRef = generateOrderRef();

    const newOrder = await addOrder({
      ref: orderRef,
      userId: user.id,
      items: items as OrderItem[],
      shipping: shipping as ShippingAddress,
      subtotal,
      shippingCost,
      discount,
      total,
      status: 'pending',
      paymentMethod: paymentMethod as PaymentMethod,
      paymentStatus: 'pending',
      referralCode: validReferralCode,
      commissionsGenerated: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Increment promotion usage
    if (appliedPromoId) {
      try {
        const promo = await getPromotionByCode(promoCode);
        if (promo) {
          const updatedCustomers = { ...promo.usedByCustomers };
          updatedCustomers[user.id] = (updatedCustomers[user.id] || 0) + 1;
          await updatePromotion(promo.id, {
            usedCount: promo.usedCount + 1,
            usedByCustomers: updatedCustomers,
          });
        }
      } catch (promoError) {
        console.error('Promotion usage tracking error:', promoError);
      }
    }

    // If payment is card and referral code used, generate commissions immediately
    // For crypto, commissions are generated when payment is confirmed
    if (paymentMethod === 'card' && validReferralCode) {
      try {
        const commissions = await calculateCommissions(
          newOrder as Order,
          settings
        );

        for (const commission of commissions) {
          await addCommission(commission);
        }

        await updateOrder(newOrder.id, {
          commissionsGenerated: true,
          updatedAt: new Date().toISOString(),
        });
      } catch (commError) {
        console.error('Commission generation error:', commError instanceof Error ? commError.message : 'Unknown error');
      }
    }

    return NextResponse.json(
      {
        order: {
          id: newOrder.id,
          ref: newOrder.ref,
          total: newOrder.total,
          subtotal: newOrder.subtotal,
          shippingCost: newOrder.shippingCost,
          discount: newOrder.discount,
          paymentMethod: newOrder.paymentMethod,
          paymentStatus: newOrder.paymentStatus,
          status: newOrder.status,
          createdAt: newOrder.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
