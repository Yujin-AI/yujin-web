import { redirect } from "next/navigation";

import { getServerUser } from "@/lib/auth/server-user";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await getServerUser();
    if (user) redirect("/dashboard");

    return <div className="min-h-screen overflow-hidden">{children}</div>;
}
