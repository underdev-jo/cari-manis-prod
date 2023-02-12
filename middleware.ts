import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/_dashboard", "/_adminLogin"],
};

export default function middleware(req: NextRequest) {
  let url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const hostname = req.headers.get("host") || "";

  const inLocal = "localhost:3000";
  const inStg = "stg-cari-manis.vercel.app";
  const inProd = "cari-manis.vercel.app";
  const globalDomain = "www.cari-manis.my.id";

  const parts = hostname.split(".");
  const subdomain = parts.shift();

  const checkSub =
    subdomain === inLocal || subdomain === inStg || subdomain === inProd;
  const checkStg = pathname === inStg || hostname === inStg;
  const checkProd = pathname === inProd || hostname === inProd;
  const checkGlob = pathname === globalDomain || hostname === globalDomain;

  if (pathname.startsWith("/_dashboard") || pathname.startsWith("/_adminLogin"))
    url.pathname = "/404";
  // else if (
  //   subdomain === inLocal ||
  //   subdomain === inProd ||
  //   pathname === inProd ||
  //   hostname === inProd ||
  //   pathname === globalDomain ||
  //   hostname === globalDomain
  // )
  else if (checkSub || checkStg || checkProd || checkGlob)
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
