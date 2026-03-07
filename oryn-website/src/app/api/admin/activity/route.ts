import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin-auth';
import { getActivityLog } from '@/lib/db';

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '50');

  let logs = await getActivityLog();
  if (type) logs = logs.filter((l) => l.type === type);
  logs = logs.slice(0, limit);

  return NextResponse.json({ logs });
}
