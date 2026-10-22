
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();

export async function POST(request: NextRequest) {
  try {
    if (!BASE_URL || !ADMIN_EMAIL) {
      return NextResponse.json(
        { message: "Admin authorization is not configured." },
        { status: 500 }
      );
    }

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const profileResponse = await fetch(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: authorization },
      cache: "no-store",
    });

    if (!profileResponse.ok) {
      return NextResponse.json(
        { message: "Your session could not be verified." },
        { status: 401 }
      );
    }

    const profile = await profileResponse.json();

    if (
      typeof profile.email !== "string" ||
      profile.email.trim().toLowerCase() !== ADMIN_EMAIL
    ) {
      return NextResponse.json(
        { message: "Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, price, description, categoryId, images } = body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      typeof description !== "string" ||
      !description.trim() ||
      !Number.isInteger(categoryId) ||
      categoryId <= 0 ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !images.every(
        (image: unknown) =>
          typeof image === "string" &&
          /^https?:\/\//i.test(image)
      )
    ) {
      return NextResponse.json(
        { message: "Please provide valid product details." },
        { status: 400 }
      );
    }

    // Keep shared demo data safe: do not create products remotely.
    return NextResponse.json(
      {
        message:
          "Product details passed validation, but creation is disabled to protect shared demo data.",
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to process the product request." },
      { status: 500 }
    );
  }
}

