import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/lib/utils/auth";
const protectedRoutes = ["/properties/add", "/profile"];
const unprotectedRoutes = ["/", "/properties", "/properties/[id]"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
