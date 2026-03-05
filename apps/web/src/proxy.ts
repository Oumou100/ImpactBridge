import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "ib_access_token";
const LOGIN_PATH = "/admin/login";
const ADMIN_PREFIX = "/admin";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;

  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  const isLoginRoute = pathname === LOGIN_PATH;

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (accessToken && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_PREFIX;
    url.searchParams.delete("redirect");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
