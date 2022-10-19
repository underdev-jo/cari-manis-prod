import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/_dashboard", "/_adminLogin", "/drinks", "/drinks/:id"],
};

export default function middleware(req: NextRequest) {
  let url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const hostname = req.headers.get("host") || "";

  const inLocal = "localhost:3000";
  const inProd = "cari-manis.vercel.app";
  const inDomain = "www.cari-manis.my.id";

  const parts = hostname.split(".");
  const subdomain = parts.shift();

  if (pathname.startsWith("/_dashboard") || pathname.startsWith("/_adminLogin"))
    url.pathname = "/404";
  else if (
    subdomain === inLocal ||
    subdomain === inProd ||
    pathname === inProd ||
    hostname === inProd ||
    pathname === inDomain ||
    hostname === inDomain
  )
    url.pathname = pathname;
  else if (subdomain === "onlymin") {
    const adminCookie = req.cookies.get("onlymin");

    const hasAdminData = adminCookie && Object.keys(adminCookie).length > 0;

    if (hasAdminData) url.pathname = `/_dashboard${pathname}`;
    else url.pathname = "/_adminLogin";
  } else url.pathname = "/404";

  const res = NextResponse.rewrite(url);
  if (!req.cookies.get("dailySugarLimit"))
    res.cookies.set("dailySugarLimit", 50);
  return res;
}
