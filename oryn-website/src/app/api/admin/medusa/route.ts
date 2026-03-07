import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";
import {
  getMedusaOrders,
  getMedusaCustomers,
  getMedusaProducts,
  getMedusaPayments,
} from "@/lib/medusa-admin";

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  try {
    switch (resource) {
      case "orders": {
        const limit = parseInt(searchParams.get("limit") || "50");
        const offset = parseInt(searchParams.get("offset") || "0");
        const data = await getMedusaOrders(limit, offset);
        return NextResponse.json(data);
      }

      case "customers": {
        const limit = parseInt(searchParams.get("limit") || "50");
        const offset = parseInt(searchParams.get("offset") || "0");
        const data = await getMedusaCustomers(limit, offset);
        return NextResponse.json(data);
      }

      case "products": {
        const data = await getMedusaProducts();
        return NextResponse.json(data);
      }

      case "payments": {
        const data = await getMedusaPayments();
        return NextResponse.json(data);
      }

      case "overview": {
        // Fetch all data for dashboard overview
        const [orders, customers, products, payments] = await Promise.allSettled([
          getMedusaOrders(100),
          getMedusaCustomers(100),
          getMedusaProducts(50),
          getMedusaPayments(100),
        ]);

        const ordersData = orders.status === "fulfilled" ? orders.value : { orders: [], count: 0 };
        const customersData = customers.status === "fulfilled" ? customers.value : { customers: [], count: 0 };
        const productsData = products.status === "fulfilled" ? products.value : { products: [], count: 0 };
        const paymentsData = payments.status === "fulfilled" ? payments.value : { payments: [], count: 0 };

        // Calculate analytics
        const totalRevenue = ordersData.orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const totalOrders = ordersData.count;
        const totalCustomers = customersData.count;

        // Revenue by day (last 30 days)
        const now = new Date();
        const revenueByDay: Record<string, number> = {};
        const ordersByDay: Record<string, number> = {};
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().split("T")[0];
          revenueByDay[key] = 0;
          ordersByDay[key] = 0;
        }
        for (const order of ordersData.orders) {
          const day = order.created_at?.split("T")[0];
          if (day && revenueByDay[day] !== undefined) {
            revenueByDay[day] += order.total || 0;
            ordersByDay[day] += 1;
          }
        }

        // Top products
        const productSales: Record<string, { name: string; sales: number; revenue: number }> = {};
        for (const order of ordersData.orders) {
          for (const item of order.items || []) {
            const key = item.title;
            if (!productSales[key]) {
              productSales[key] = { name: item.title, sales: 0, revenue: 0 };
            }
            productSales[key].sales += item.quantity;
            productSales[key].revenue += item.total;
          }
        }
        const topProducts = Object.values(productSales)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10);

        // Orders by status
        const ordersByStatus: Record<string, number> = {};
        for (const order of ordersData.orders) {
          ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
        }

        // Orders by country
        const ordersByCountry: Record<string, number> = {};
        for (const order of ordersData.orders) {
          const country = order.shipping_address?.country_code?.toUpperCase() || "Unknown";
          ordersByCountry[country] = (ordersByCountry[country] || 0) + 1;
        }

        // Average order value
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return NextResponse.json({
          totalRevenue,
          totalOrders,
          totalCustomers,
          totalProducts: productsData.count,
          totalPayments: paymentsData.count,
          avgOrderValue,
          revenueByDay: Object.entries(revenueByDay).map(([date, amount]) => ({ date, amount })),
          ordersByDay: Object.entries(ordersByDay).map(([date, count]) => ({ date, count })),
          topProducts,
          ordersByStatus,
          ordersByCountry,
          recentOrders: ordersData.orders.slice(0, 10),
          recentCustomers: customersData.customers.slice(0, 10),
        });
      }

      default:
        return NextResponse.json({ error: "Invalid resource. Use: orders, customers, products, payments, overview" }, { status: 400 });
    }
  } catch (err) {
    console.error("Medusa admin API error:", err);
    const message = err instanceof Error ? err.message : "Failed to fetch from Medusa";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
