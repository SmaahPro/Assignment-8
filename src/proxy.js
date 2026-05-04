import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/my-profile", "/update-profile", "/details-page/:path*"];

    const isProtectedRoute = protectedRoutes.some(route => {
        if (route.includes(":path*")) {
            const baseRoute = route.replace("/:path*", "");
            return pathname.startsWith(baseRoute);
        }
        return pathname === route;
    });

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-profile", "/update-profile", "/details-page/:path*", "/login", "/register"],
};