import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrder, deleteOrder, addActivityLog } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { Order, OrderStatus } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as OrderStatus | null;
    const search = searchParams.get('search');

    let orders = await getOrders();

    if (status) {
      orders = orders.filter((o: Order) => o.status === status);
    }

    if (search) {
      const query = search.toLowerCase();
      orders = orders.filter(
        (o: Order) =>
          o.ref.toLowerCase().includes(query) ||
          o.shipping.email.toLowerCase().includes(query) ||
          o.shipping.firstName.toLowerCase().includes(query) ||
          o.shipping.lastName.toLowerCase().includes(query)
      );
    }

    // Sort by newest first
    orders.sort(
      (a: Order, b: Order) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Admin orders GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses: OrderStatus[] = [
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedOrder = await updateOrder(orderId, {
      status,
      updatedAt: new Date().toISOString(),
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    await addActivityLog({
      type: 'order',
      action: 'status_updated',
      description: `Order ${updatedOrder.ref} status changed to ${status}`,
      metadata: { orderId, status },
      adminId: admin.id,
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error('Admin orders PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order id is required' }, { status: 400 });
    }

    const deleted = await deleteOrder(orderId);
    if (!deleted) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    await addActivityLog({
      type: 'order',
      action: 'deleted',
      description: `Order deleted`,
      metadata: { orderId },
      adminId: admin.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin orders DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
