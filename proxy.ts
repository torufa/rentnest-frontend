import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "@/utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/", "/properties", "/contact"];

const PROTECTED_ROUTES = {
  ADMIN: ["/admin"],
  LANDLORD: ["/landlord"],
  TENANT: ["/tenant"],
} as const;

type Role = keyof typeof PROTECTED_ROUTES;

const DASHBOARDS: Record<Role, string> = {
  ADMIN: "/admin",
  LANDLORD: "/landlord",
  TENANT: "/tenant",
};

const isRouteMatch = (pathname: string, routes: readonly string[]) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

const getRoleFromToken = (token: unknown): Role | null => {
  if (!token || typeof token !== "object") {
    return null;
  }

  const role = (token as { role?: string }).role;

  if (role === "ADMIN" || role === "LANDLORD" || role === "TENANT") {
    return role;
  }

  return null;
};

const redirectWithCookies = (response: NextResponse, url: URL) => {
  const redirectResponse = NextResponse.redirect(url);

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
};

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  let accessToken = request.cookies.get("accessToken")?.value;

  const refreshToken = request.cookies.get("refreshToken")?.value;

  // route checks

  const isPublicRoute = isRouteMatch(pathname, PUBLIC_ROUTES);

  const isAuthRoute = isRouteMatch(pathname, AUTH_ROUTES);

  const protectedRouteEntry = (
    Object.entries(PROTECTED_ROUTES) as [Role, readonly string[]][]
  ).find(([, routes]) => isRouteMatch(pathname, routes));

  const requiredRole = protectedRouteEntry?.[0] ?? null;

  const isProtectedRoute = !!requiredRole;

  // tokens

  let verifiedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!)
    : null;

  const verifiedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!)
    : null;

  let response = NextResponse.next();

  if (!verifiedAccessToken?.success && verifiedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success && result.data?.accessToken) {
      const newAccessToken = result.data.accessToken;

      accessToken = newAccessToken;

      verifiedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET!,
      );

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
  }

  // protected route authentication
  const userRole = verifiedAccessToken?.success
    ? getRoleFromToken(verifiedAccessToken.data)
    : null;

  if (isAuthRoute) {
    if (userRole) {
      return redirectWithCookies(
        response,
        new URL(DASHBOARDS[userRole], request.url),
      );
    }

    return response;
  }

  if (isPublicRoute) {
    return response;
  }

  if (isProtectedRoute && !verifiedAccessToken?.success) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathname + search);

    const redirectResponse = NextResponse.redirect(loginUrl);

    redirectResponse.cookies.delete("accessToken");

    return redirectResponse;
  }

  // role-based authorization

  if (isProtectedRoute && userRole !== requiredRole) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
