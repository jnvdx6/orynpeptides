import { NextRequest, NextResponse } from 'next/server';
import { getUsers, getOrders, getCommissions } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { DashboardStats, Order } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [users, orders, commissions] = await Promise.all([
      getUsers(),
      getOrders(),
      getCommissions(),
    ]);

    // Revenue by day (last 7 days)
    const now = new Date();
    const revenueByDay: { date: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayRevenue = orders
        .filter(
          (o: Order) =>
            o.createdAt.startsWith(dateStr) &&
            o.paymentStatus === 'confirmed' &&
            o.status !== 'cancelled'
        )
        .reduce((sum: number, o: Order) => sum + o.total, 0);

      revenueByDay.push({ date: dateStr, amount: dayRevenue });
    }

    // Top products by sales
    const productMap = new Map<string, { name: string; sales: number; revenue: number }>();
    for (const order of orders) {
      if (order.status === 'cancelled') continue;
      for (const item of order.items) {
        const existing = productMap.get(item.productId) || {
          name: item.productName,
          sales: 0,
          revenue: 0,
        };
        existing.sales += item.quantity;
        existing.revenue += item.price * item.quantity;
        productMap.set(item.productId, existing);
      }
    }
    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Recent orders (last 10)
    const recentOrders = [...orders]
      .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    const confirmedOrders = orders.filter(
      (o: Order) => o.paymentStatus === 'confirmed' && o.status !== 'cancelled'
    );

    const totalRevenue = confirmedOrders.reduce((sum: number, o: Order) => sum + o.total, 0);

    const usersWithReferrals = users.filter((u) => u.referredBy);
    const activeReferrers = users.filter(
      (u) => users.some((other) => other.referredBy === u.referralCode)
    );

    const paidCommissions = commissions.filter((c) => c.status === 'paid');
    const totalCommissionsPaid = paidCommissions.reduce((sum, c) => sum + c.amount, 0);

    const referralChainLengths = users
      .filter((u) => u.referralTree.length > 0)
      .map((u) => u.referralTree.length);
    const averageChainLength =
      referralChainLengths.length > 0
        ? referralChainLengths.reduce((a, b) => a + b, 0) / referralChainLengths.length
        : 0;

    const stats: DashboardStats = {
      totalRevenue,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalReferrals: usersWithReferrals.length,
      pendingOrders: orders.filter((o: Order) => o.status === 'pending').length,
      cryptoPayments: orders.filter((o: Order) => o.paymentMethod === 'crypto').length,
      pendingCommissions: commissions.filter((c) => c.status === 'pending').length,
      revenueByDay,
      topProducts,
      recentOrders,
      referralStats: {
        totalActive: activeReferrers.length,
        totalCommissionsPaid,
        averageChainLength: Math.round(averageChainLength * 100) / 100,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
