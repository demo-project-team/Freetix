import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("org")?.value;
  if (pathname.includes("organization") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next()
}
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
