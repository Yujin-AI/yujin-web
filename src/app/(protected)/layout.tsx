import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { sidebarConfig } from "@/config/sidebar-config";
import { getDBUser } from "@/lib/auth/server-user";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "@/components/user-account-nav";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await getDBUser();
    if (!user) {
        redirect(
            "/logout?title=Unauthorized&description=You must be logged in to view this page.&variant=destructive"
        );
    }
    const expiresAt = new Date(user.token.expiresAt);
    if (expiresAt < new Date()) {
        redirect(
            "/logout?title=Session expired&description=Please log in again.&variant=destructive"
        );
    }

    // const response = await api("/chatbots", {});
    // const chatbots = await response.json().then((data) => data.data);

    const headersList = headers();
    const url = headersList.get("x-pathname");

    if (!user.defaultChatbotId && url !== "/chatbots") redirect("/chatbots");

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    {/* <MainNav items={dashboardConfig.mainNav} /> */}
                    <Link href={"/chatbots"}>
                        <Image
                            src="/logo.svg"
                            alt="Yujin logo"
                            width={50}
                            height={50}
                        ></Image>
                    </Link>
                    <div className="flex gap-3">
                        <ModeToggle />

                        <UserAccountNav
                            user={{
                                name: user.name,
                                email: user.email,
                            }}
                        />
                    </div>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={sidebarConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
