import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    const isProtectedRoute =
        pathname === "/tasks" ||
        pathname.startsWith("/tasks/") ||
        pathname === "/api/tasks" ||
        pathname.startsWith("/api/tasks/");

    if (isProtectedRoute) {
        const { userId } = await auth();

        if (!userId) {
            if (pathname.startsWith("/api/")) {
                return NextResponse.json(
                    { message: "Unauthorized" },
                    { status: 401 }
                );
            }

            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for Clerk's auto-proxy path
        '/__clerk/:path*',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};