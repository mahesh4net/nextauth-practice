import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const callbackUrl = req.nextUrl.pathname.substring(1);
    if (!token && !req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url))

    }



}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/blog",    // Protect the /blog page
    "/profile", // Protect the /profile page
    "/admin",   // Protect the /admin page
  ],
};