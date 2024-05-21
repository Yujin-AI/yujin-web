import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", req.nextUrl.pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
