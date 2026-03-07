import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin-auth';
import {
  getPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
  addActivityLog,
} from '@/lib/db';
import type { Promotion } from '@/types';

// GET /api/admin/promotions
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const promotions = await getPromotions();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  let filtered = promotions;
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (type) filtered = filtered.filter((p) => p.type === type);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.label.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Sort by newest first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ promotions: filtered });
}

// POST /api/admin/promotions - Create
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { code, type, label } = body;

  if (!code || !type || !label) {
    return NextResponse.json(
      { error: 'Code, type, and label are required' },
      { status: 400 }
    );
  }

  // Check for duplicate code
  const existing = await getPromotions();
  if (existing.find((p) => p.code.toUpperCase() === code.toUpperCase())) {
    return NextResponse.json(
      { error: 'A promotion with this code already exists' },
      { status: 409 }
    );
  }

  const now = new Date().toISOString();
  const promotion: Promotion = {
    id: `promo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: code.toUpperCase(),
    type: type || 'standard',
    status: body.status || 'draft',
    label,
    description: body.description || '',
    discountType: body.discountType || 'percentage',
    discountValue: body.discountValue ?? 10,
    targetType: body.targetType || 'order',
    currencyCode: body.currencyCode || 'EUR',
    minOrderAmount: body.minOrderAmount,
    maxDiscountAmount: body.maxDiscountAmount,
    validFrom: body.validFrom,
    validTo: body.validTo,
    applicableProductIds: body.applicableProductIds,
    applicableCategories: body.applicableCategories,
    excludedProductIds: body.excludedProductIds,
    totalLimit: body.totalLimit,
    perCustomerLimit: body.perCustomerLimit,
    usedCount: 0,
    usedByCustomers: {},
    buyRulesMinQuantity: body.buyRulesMinQuantity,
    buyRulesProductIds: body.buyRulesProductIds,
    getRulesProductIds: body.getRulesProductIds,
    getRulesQuantity: body.getRulesQuantity,
    getRulesDiscountType: body.getRulesDiscountType,
    getRulesDiscountValue: body.getRulesDiscountValue,
    campaignId: body.campaignId,
    isCombinable: body.isCombinable ?? false,
    createdAt: now,
    updatedAt: now,
  };

  await addPromotion(promotion);
  await addActivityLog({
    type: 'settings',
    action: 'promotion_created',
    description: `Created promotion "${label}" (${code})`,
    metadata: { promotionId: promotion.id, code: promotion.code },
    adminId: admin.id,
  });

  return NextResponse.json({ promotion }, { status: 201 });
}

// PUT /api/admin/promotions - Update
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, ...updates } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Promotion ID is required' }, { status: 400 });
  }

  // If code is being changed, check for duplicates
  if (updates.code) {
    updates.code = updates.code.toUpperCase();
    const existing = await getPromotions();
    const duplicate = existing.find(
      (p) => p.code.toUpperCase() === updates.code && p.id !== id
    );
    if (duplicate) {
      return NextResponse.json(
        { error: 'A promotion with this code already exists' },
        { status: 409 }
      );
    }
  }

  const promotion = await updatePromotion(id, updates);
  if (!promotion) {
    return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
  }

  await addActivityLog({
    type: 'settings',
    action: 'promotion_updated',
    description: `Updated promotion "${promotion.label}" (${promotion.code})`,
    metadata: { promotionId: id },
    adminId: admin.id,
  });

  return NextResponse.json({ promotion });
}

// DELETE /api/admin/promotions
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Promotion ID is required' }, { status: 400 });
  }

  const promotions = await getPromotions();
  const promo = promotions.find((p) => p.id === id);

  const deleted = await deletePromotion(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
  }

  await addActivityLog({
    type: 'settings',
    action: 'promotion_deleted',
    description: `Deleted promotion "${promo?.label}" (${promo?.code})`,
    metadata: { promotionId: id },
    adminId: admin.id,
  });

  return NextResponse.json({ success: true });
}
