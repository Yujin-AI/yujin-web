import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    const pathname = req.nextUrl.pathname;

    requestHeaders.set("x-pathname", pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
