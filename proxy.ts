/**
 * proxy.ts
 * 
 * Standard proxy handler for Next.js 16 architecture.
 * Use this instead of middleware.ts for request interception and rewriting.
 */

import { NextRequest, NextResponse } from 'next/server';

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Example: Redirect or rewrite logic here
  // if (url.pathname.startsWith('/old-path')) {
  //   url.pathname = '/new-path';
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}
