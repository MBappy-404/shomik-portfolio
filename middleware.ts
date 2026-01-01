/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
// middleware.ts
// middleware.ts
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const middleware = (req: NextRequest) => {
  // read the "user" cookie
  const userEmail = req.cookies.get("user")?.value

  // only allow sara0810@gmail.com
  if (userEmail !== "shomikujzaman@gmail.com") {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/login"
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export default middleware

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
}


