import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib";

const authRoutes = ["/test/auth-check", "/test/auth-check/lout"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const path = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);

  if (isAuthRoute && session) {
    return NextResponse.redirect(
      new URL("/auth/signin", request.url)
    );
  }

  return await updateSession(request);
}
