
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!baseUrl || !adminEmail) {
    return NextResponse.json(
      { error: "Admin authorization is not configured." },
      { status: 500 }
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const profileResponse = await fetch(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: authorization,
      },
      cache: "no-store",
    });

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: "Your session could not be verified." },
        { status: 401 }
      );
    }

    const profile = await profileResponse.json();

    if (
      typeof profile.email !== "string" ||
      profile.email.trim().toLowerCase() !== adminEmail
    ) {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    return NextResponse.json({ isAdmin: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify your account right now." },
      { status: 502 }
    );
  }
}
