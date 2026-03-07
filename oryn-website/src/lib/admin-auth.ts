import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getUsers } from '@/lib/db';

export async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  const userId = verifyToken(token);
  if (!userId) return null;

  const users = await getUsers();
  const user = users.find(u => u.id === userId);
  if (!user || user.role !== 'admin') return null;

  return user;
}

export async function verifyUser(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  const userId = verifyToken(token);
  if (!userId) return null;

  const users = await getUsers();
  const user = users.find(u => u.id === userId);
  if (!user || !user.isActive) return null;

  return user;
}
