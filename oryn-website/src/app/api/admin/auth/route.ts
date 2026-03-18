import { NextRequest, NextResponse } from "next/server";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Authenticate against Medusa v2 admin auth
    const res = await fetch(`${MEDUSA_URL}/auth/user/emailpass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const data = await res.json();

    if (!data.token) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    return NextResponse.json({ token: data.token });
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 503 });
  }
}
