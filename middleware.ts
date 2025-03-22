"use server"

import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


const isProtectedRoute = createRouteMatcher(['/']);


export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect() 
    
      const url = req.nextUrl.clone();
      if (!auth.name){
        // Redirect unauthenticated users to the "/auth" page
        url.pathname = "/auth";
        return NextResponse.redirect(url);
      }
    
      return NextResponse.next();
  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/'
  ],
}