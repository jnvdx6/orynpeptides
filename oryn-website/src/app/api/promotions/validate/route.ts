import { NextResponse } from "next/server";
import { FIRST_PURCHASE_DISCOUNT } from "@/lib/discounts";

interface ValidateRequest {
  code: string;
  subtotal: number;
  productIds?: string[];
}

// Local promo code definitions — extend as needed
const PROMO_CODES: Record<
  string,
  {
    code: string;
    label: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    minSubtotal?: number;
    tiered?: { minItems: number; discountValue: number }[];
  }
> = {
  [FIRST_PURCHASE_DISCOUNT.code]: {
    code: FIRST_PURCHASE_DISCOUNT.code,
    label: FIRST_PURCHASE_DISCOUNT.label,
    discountType: "percentage",
    discountValue: FIRST_PURCHASE_DISCOUNT.percentage,
  },
  PEAK26: {
    code: "PEAK26",
    label: "Peak Performance Campaign — up to 15% off",
    discountType: "percentage",
    discountValue: 10,
    tiered: [
      { minItems: 3, discountValue: 15 },
      { minItems: 2, discountValue: 10 },
    ],
  },
};

export async function POST(request: Request) {
  try {
    const body: ValidateRequest = await request.json();
    const { code, subtotal } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ valid: false, error: "Code is required" }, { status: 400 });
    }

    const promo = PROMO_CODES[code.toUpperCase()];
    if (!promo) {
      return NextResponse.json({ valid: false, error: "Invalid promo code" });
    }

    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order of ${promo.minSubtotal} required`,
      });
    }

    // Resolve tiered discount if applicable
    let effectiveValue = promo.discountValue;
    const itemCount = body.productIds?.length ?? 0;
    if (promo.tiered && itemCount > 0) {
      for (const tier of promo.tiered) {
        if (itemCount >= tier.minItems) {
          effectiveValue = tier.discountValue;
          break;
        }
      }
    }

    const discountAmount =
      promo.discountType === "percentage"
        ? Math.round((subtotal * effectiveValue) / 100 * 100) / 100
        : effectiveValue;

    return NextResponse.json({
      valid: true,
      promotion: { ...promo, discountValue: effectiveValue },
      discountAmount,
    });
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid request" }, { status: 400 });
  }
}
