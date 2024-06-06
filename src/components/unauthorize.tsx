"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div className="max-w-md space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight  sm:text-5xl">
                    Unauthorized Access
                </h1>
                <p className="text-lg font-medium text-muted-foreground ">
                    You are not authorized to access{" "}
                    <span className="font-bold text-red-400">{pathname}</span>
                </p>
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="login"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}
