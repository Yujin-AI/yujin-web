import { cookies, headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { sidebarConfig } from "@/config/sidebar-config";
import { getServerUser } from "@/lib/auth/server-user";
import { ModeToggle } from "@/components/mode-toggle";
import { SideNav } from "@/components/nav";
import SessionExpired from "@/components/session-expired";
import UnauthorizedPage from "@/components/unauthorize";
import { UserAccountNav } from "@/components/user-account-nav";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await getServerUser();

    if (!user) {
        return <UnauthorizedPage />;
    }
    const expiresAt = new Date(user?.token?.expiresAt);
    if (expiresAt < new Date()) {
        <SessionExpired />;
    }

    const headersList = headers();
    const pathname = headersList.get("x-pathname");

    if (!cookies().get("selectedChatbot") && pathname !== "/chatbots") {
        redirect("chatbots");
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    {/* <MainNav items={dashboardConfig.mainNav} /> */}
                    <Link href={"/chatbots"}>
                        <Image
                            src="logo.svg"
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
                    <SideNav items={sidebarConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
