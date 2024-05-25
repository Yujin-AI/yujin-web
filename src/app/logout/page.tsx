"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

import { Icons } from "@/components/icons";

export default function LogoutPage() {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown < 1) {
            signOut({ redirect: true, callbackUrl: "/login" });
        }

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 ">
            <div className="mx-auto max-w-md space-y-4 rounded-lg p-8 shadow-lg">
                <div className="space-y-2 text-center">
                    <Icons.logOut className="mx-auto h-12 w-12 text-red-500" />
                    <p>
                        Redirecting to the login page in{" "}
                        <span
                            className="font-medium text-red-500"
                            id="countdown"
                        >
                            {countdown}
                        </span>{" "}
                        seconds.
                    </p>
                </div>
            </div>
        </div>
    );
}
