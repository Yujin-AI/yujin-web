import { redirect } from "next/navigation";

import { getServerUser } from "@/lib/auth/server-user";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await getServerUser();
    if (!user) {
        // toast({
        //     title: "Unauthorized",
        //     description: "You must be logged in to view this page.",
        //     variant: "destructive",
        // });
        redirect(
            "/logout?title=Unauthorized&description=You must be logged in to view this page.&variant=destructive"
        );
    }
    const expiresAt = new Date(user.token.expiresAt);
    if (expiresAt < new Date()) {
        // toast({
        //     title: "Session expired",
        //     description: "Your session has expired. Please log in again.",
        //     variant: "destructive",
        // });
        redirect(
            "/logout?title=Session expired&description=Please log in again.&variant=destructive"
        );
    }

    return <div className="min-h-screen overflow-hidden">{children}</div>;
}
