import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/_dashboard"],
};

export default function middleware(req: NextRequest) {
  let url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const hostname = req.headers.get("host") || "";

  const inLocal = "localhost:5000";
  const inProd = "multi-wedding.vercel.app";
  const inDomain = "www.pengen-nikah.my.id";

  const parts = hostname.split(".");
  const subdomain = parts.shift();

  console.log("Middleware: ", { hostname, subdomain });

  if (pathname.startsWith("/_dashboard")) url.pathname = "/404";
  else if (
    subdomain === inLocal ||
    subdomain === inProd ||
    pathname === inProd ||
    hostname === inProd ||
    pathname === inDomain ||
    hostname === inDomain
  )
    url.pathname = pathname;
  else if (subdomain === "dashboard") url.pathname = "/_dashboard";
  else url.pathname = "/404";

  return NextResponse.rewrite(url);
}
