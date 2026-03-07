import { NextRequest, NextResponse } from 'next/server';
import { getPromotionByCode } from '@/lib/db';
import type { PromotionValidationResult } from '@/types';

// POST /api/promotions/validate - Public endpoint for checkout validation
export async function POST(request: NextRequest) {
  try {
    const { code, subtotal, productIds, customerId } = await request.json();

    if (!code) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'Promotion code is required',
      });
    }

    const promotion = await getPromotionByCode(code);

    if (!promotion) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'Invalid promotion code',
      });
    }

    if (promotion.status !== 'active') {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'This promotion is not currently active',
      });
    }

    // Check date validity
    const now = new Date();
    if (promotion.validFrom && new Date(promotion.validFrom) > now) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'This promotion has not started yet',
      });
    }
    if (promotion.validTo && new Date(promotion.validTo) < now) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'This promotion has expired',
      });
    }

    // Check total usage limit
    if (promotion.totalLimit && promotion.usedCount >= promotion.totalLimit) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: 'This promotion has reached its usage limit',
      });
    }

    // Check per-customer limit
    if (customerId && promotion.perCustomerLimit) {
      const customerUsage = promotion.usedByCustomers[customerId] || 0;
      if (customerUsage >= promotion.perCustomerLimit) {
        return NextResponse.json<PromotionValidationResult>({
          valid: false,
          error: 'You have already used this promotion the maximum number of times',
        });
      }
    }

    // Check minimum order amount
    if (promotion.minOrderAmount && subtotal < promotion.minOrderAmount) {
      return NextResponse.json<PromotionValidationResult>({
        valid: false,
        error: `Minimum order amount of €${promotion.minOrderAmount.toFixed(2)} required`,
      });
    }

    // Check applicable products
    if (promotion.applicableProductIds && promotion.applicableProductIds.length > 0 && productIds) {
      const hasApplicable = productIds.some((id: string) =>
        promotion.applicableProductIds!.includes(id)
      );
      if (!hasApplicable) {
        return NextResponse.json<PromotionValidationResult>({
          valid: false,
          error: 'This promotion does not apply to items in your cart',
        });
      }
    }

    // Check excluded products
    if (promotion.excludedProductIds && promotion.excludedProductIds.length > 0 && productIds) {
      const allExcluded = productIds.every((id: string) =>
        promotion.excludedProductIds!.includes(id)
      );
      if (allExcluded) {
        return NextResponse.json<PromotionValidationResult>({
          valid: false,
          error: 'This promotion does not apply to items in your cart',
        });
      }
    }

    // Calculate discount amount
    let discountAmount = 0;
    const applicableSubtotal = subtotal || 0;

    if (promotion.type === 'standard') {
      if (promotion.discountType === 'percentage') {
        discountAmount = applicableSubtotal * (promotion.discountValue / 100);
      } else {
        discountAmount = promotion.discountValue;
      }

      // Cap at max discount if set
      if (promotion.maxDiscountAmount && discountAmount > promotion.maxDiscountAmount) {
        discountAmount = promotion.maxDiscountAmount;
      }

      // Don't exceed subtotal
      if (discountAmount > applicableSubtotal) {
        discountAmount = applicableSubtotal;
      }
    }

    discountAmount = Math.round(discountAmount * 100) / 100;

    return NextResponse.json<PromotionValidationResult>({
      valid: true,
      promotion,
      discountAmount,
    });
  } catch {
    return NextResponse.json<PromotionValidationResult>({
      valid: false,
      error: 'Failed to validate promotion',
    });
  }
}
