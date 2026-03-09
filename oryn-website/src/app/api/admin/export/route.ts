import { NextRequest, NextResponse } from 'next/server';
import { getOrders, getUsers, getCommissions } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import { verifyToken } from '@/lib/auth';
import type { Order, User, Commission } from '@/types';

function escapeCSV(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const headerLine = headers.map(escapeCSV).join(',');
  const dataLines = rows.map((row) => row.map(escapeCSV).join(','));
  return [headerLine, ...dataLines].join('\n');
}

// Verify admin via header or query param (needed for window.open downloads)
async function verifyExportAdmin(request: NextRequest) {
  // Try header auth first
  const admin = await verifyAdmin(request);
  if (admin) return admin;

  // Fall back to query param token (for direct browser downloads)
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) return null;

  const userId = verifyToken(token);
  if (!userId) return null;

  const users = await getUsers();
  const user = users.find((u: User) => u.id === userId);
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyExportAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource');

    let csv = '';
    let filename = 'export.csv';

    switch (resource) {
      case 'orders': {
        const orders = await getOrders();
        orders.sort(
          (a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const headers = [
          'Reference', 'Status', 'Date', 'Customer Email', 'Customer Name',
          'Items', 'Subtotal', 'Shipping', 'Discount', 'Total',
          'Payment Method', 'City', 'Country',
        ];
        const rows = orders.map((o: Order) => [
          o.ref,
          o.status,
          new Date(o.createdAt).toISOString().split('T')[0],
          o.shipping?.email || '',
          `${o.shipping?.firstName || ''} ${o.shipping?.lastName || ''}`.trim(),
          (o.items || []).map((i: { quantity?: number; name?: string }) => `${i.quantity}x ${i.name}`).join('; '),
          o.subtotal,
          o.shippingCost || 0,
          o.discount || 0,
          o.total,
          o.paymentMethod || '',
          o.shipping?.city || '',
          o.shipping?.country || '',
        ]);
        csv = toCSV(headers, rows);
        filename = `oryn-orders-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'customers': {
        const users = await getUsers();
        const customers = users.filter((u: User) => u.role !== 'admin');
        const headers = [
          'ID', 'Email', 'First Name', 'Last Name', 'Organization',
          'Referral Code', 'Total Earnings', 'Available Balance',
          'Created', 'Active',
        ];
        const rows = customers.map((u: User) => [
          u.id,
          u.email,
          u.firstName,
          u.lastName,
          u.organization || '',
          u.referralCode || '',
          u.totalEarnings || 0,
          u.availableBalance || 0,
          new Date(u.createdAt).toISOString().split('T')[0],
          u.isActive ? 'Yes' : 'No',
        ]);
        csv = toCSV(headers, rows);
        filename = `oryn-customers-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'commissions': {
        const commissions = await getCommissions();
        const headers = [
          'ID', 'Order ID', 'Beneficiary ID', 'Amount', 'Level',
          'Status', 'Date',
        ];
        const rows = commissions.map((c: Commission) => [
          c.id,
          c.orderId,
          c.beneficiaryId,
          c.amount,
          c.level,
          c.status,
          new Date(c.createdAt).toISOString().split('T')[0],
        ]);
        csv = toCSV(headers, rows);
        filename = `oryn-commissions-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid resource. Use: orders, customers, commissions' },
          { status: 400 }
        );
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
