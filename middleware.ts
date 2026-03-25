/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
// middleware.ts
// middleware.ts
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const userEmail = req.cookies.get("user")?.value

  // Protect /dashboard paths
  if (pathname.startsWith("/dashboard")) {
    if (userEmail !== "shomikujzaman@gmail.com") {
      const loginUrl = new URL("/login", req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export default middleware

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
}


