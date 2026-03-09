import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, getUserByReferralCode, addUser } from '@/lib/db';
import { hashPassword, generateToken, generateReferralCode } from '@/lib/auth';
import { getReferralChain } from '@/lib/referrals';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, organization, referralCodeUsed } =
      await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, password, first name, and last name are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Build referral tree if a referral code was used
    let referredBy: string | undefined;
    let referralTree: string[] = [];

    if (referralCodeUsed) {
      const referrer = await getUserByReferralCode(referralCodeUsed);
      if (referrer) {
        referredBy = referrer.referralCode;
        // Build chain of referrer IDs up to 5 levels
        const chain = await getReferralChain(referrer.id);
        referralTree = chain.map(c => c.id);
      }
    }

    const hashedPassword = hashPassword(password);
    const referralCode = generateReferralCode();

    const newUser = await addUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      organization: organization || undefined,
      role: 'customer',
      referralCode,
      referredBy,
      referralTree,
      totalEarnings: 0,
      availableBalance: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    const token = generateToken(newUser.id);

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          referralCode: newUser.referralCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
