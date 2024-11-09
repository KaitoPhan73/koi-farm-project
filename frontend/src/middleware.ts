import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/manage"];
const authPaths = ["/login", "/register"];
const managerPaths = ["/manage/users", "/manage/reports"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRaw = request.cookies.get("user")?.value ?? " ";
  let user;

  try {
    user = JSON.parse(userRaw);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    user = null;
  }
  // Redirect to /login if no accessToken for private paths
  if (!accessToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to appropriate dashboard if logged in and trying to access auth paths
  if (accessToken && authPaths.some((path) => pathname.startsWith(path))) {
    if (user?.role === "Manager") {
      return NextResponse.redirect(new URL("/manage/reports", request.url));
    }
    if (user?.role === "Staff") {
      return NextResponse.redirect(new URL("/manage/products", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow Manager access to manager paths
  if (accessToken && managerPaths.some((path) => pathname.startsWith(path))) {
    if (user?.role === "Manager") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/manage/products", request.url));
    }
  }

  // Block non-Manager and non-Staff from private paths
  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    user?.role !== "Manager" &&
    user?.role !== "Staff"
  ) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/manage/:path*"],
};
