import { NextRequest, NextResponse } from "next/server";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  // Reject obvious mock tokens
  if (token.startsWith("mock_admin_token_")) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    // Validate the token against Medusa by fetching the current user
    const res = await fetch(`${MEDUSA_URL}/admin/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json({
      valid: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        first_name: data.user?.first_name,
        last_name: data.user?.last_name,
      },
    });
  } catch {
    return NextResponse.json({ error: "Session validation failed" }, { status: 503 });
  }
}
