import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";


export default async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers()} );

  const currentPath = req.nextUrl.pathname;

  const  authRoutes: string[] = ['/login', '/create', '/create/verify-email'];
  const protectedRoutes: string[] = ['/dashboard', '/profile'];

  if (authRoutes.includes(currentPath) && session) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (protectedRoutes.includes(currentPath) && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  NextResponse.next()

}