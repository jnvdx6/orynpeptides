import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin-auth';
import { getProducts, addProduct, updateProduct, deleteProduct, addActivityLog } from '@/lib/db';
import type { AdminProduct } from '@/types';

// GET /api/admin/products - List all products
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await getProducts();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let filtered = products;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ products: filtered });
}

// POST /api/admin/products - Create a new product
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, subtitle, category, categoryLabel, dosage, volume, price, description, benefits, specs, badge, image, status, stock, sku } = body;

  if (!name || !category || !price) {
    return NextResponse.json({ error: 'Name, category, and price are required' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const id = `product-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const product: AdminProduct = {
    id,
    slug,
    name,
    subtitle: subtitle || '',
    category,
    categoryLabel: categoryLabel || category,
    dosage: dosage || '',
    volume: volume || '',
    price,
    description: description || '',
    benefits: benefits || [],
    specs: specs || {},
    badge,
    image: image || '/images/products/pen-bpc157.png',
    status: status || 'draft',
    stock: stock ?? 100,
    sku: sku || `ORYN-${slug.toUpperCase()}-001`,
    createdAt: now,
    updatedAt: now,
  };

  await addProduct(product);
  await addActivityLog({
    type: 'product',
    action: 'created',
    description: `Product "${name}" created`,
    metadata: { productId: id, price },
    adminId: admin.id,
  });

  return NextResponse.json({ product }, { status: 201 });
}

// PUT /api/admin/products - Update a product
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { productId, ...updates } = body;

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  const product = await updateProduct(productId, updates);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  await addActivityLog({
    type: 'product',
    action: 'updated',
    description: `Product "${product.name}" updated`,
    metadata: { productId, ...Object.fromEntries(Object.entries(updates).filter(([, v]) => typeof v === 'string' || typeof v === 'number').slice(0, 5)) },
    adminId: admin.id,
  });

  return NextResponse.json({ product });
}

// DELETE /api/admin/products - Delete a product
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');

  if (!productId) {
    return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
  }

  const deleted = await deleteProduct(productId);
  if (!deleted) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  await addActivityLog({
    type: 'product',
    action: 'deleted',
    description: `Product deleted`,
    metadata: { productId },
    adminId: admin.id,
  });

  return NextResponse.json({ success: true });
}
