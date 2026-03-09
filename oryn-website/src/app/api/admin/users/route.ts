import { NextRequest, NextResponse } from 'next/server';
import { getUsers, updateUser, deleteUser, addActivityLog } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';
import type { User } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as User['role'] | null;
    const search = searchParams.get('search');
    const activeOnly = searchParams.get('active');

    let users = await getUsers();

    if (role) {
      users = users.filter((u: User) => u.role === role);
    }

    if (activeOnly === 'true') {
      users = users.filter((u: User) => u.isActive);
    } else if (activeOnly === 'false') {
      users = users.filter((u: User) => !u.isActive);
    }

    if (search) {
      const query = search.toLowerCase();
      users = users.filter(
        (u: User) =>
          u.email.toLowerCase().includes(query) ||
          u.firstName.toLowerCase().includes(query) ||
          u.lastName.toLowerCase().includes(query) ||
          u.referralCode.toLowerCase().includes(query)
      );
    }

    // Sort by newest first
    users.sort(
      (a: User, b: User) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Omit passwords from response
    const sanitized = users.map(({ password, ...rest }: User) => rest);

    return NextResponse.json({ users: sanitized });
  } catch (error) {
    console.error('Admin users GET error:', error instanceof Error ? error.message : 'Unknown error');
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

    const { userId, isActive, role } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const updates: Partial<User> = {};

    if (typeof isActive === 'boolean') {
      updates.isActive = isActive;
    }

    if (role && (role === 'customer' || role === 'admin')) {
      updates.role = role;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { password, ...sanitized } = updatedUser;

    await addActivityLog({
      type: 'user',
      action: 'updated',
      description: `User ${sanitized.email} updated`,
      metadata: { userId, ...(typeof isActive === 'boolean' ? { isActive: isActive ? 1 : 0 } : {}), ...(role ? { role } : {}) },
      adminId: admin.id,
    });

    return NextResponse.json({ user: sanitized });
  } catch (error) {
    console.error('Admin users PUT error:', error instanceof Error ? error.message : 'Unknown error');
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
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'User id is required' }, { status: 400 });
    }

    if (userId === admin.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    const deleted = await deleteUser(userId);
    if (!deleted) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await addActivityLog({
      type: 'user',
      action: 'deleted',
      description: `User deleted`,
      metadata: { userId },
      adminId: admin.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin users DELETE error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
