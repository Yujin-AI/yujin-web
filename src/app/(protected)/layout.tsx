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
    const expiresAt = new Date(user.token.expiresAt);
    if (expiresAt < new Date()) {
        return <SessionExpired />;
    }

    const headersList = headers();
    const pathname = headersList.get("x-pathname");

    if (!cookies().get("selectedChatbot") && pathname !== "/chatbots") {
        redirect("chatbots");
    }

    return (
        <div className="flex min-h-screen flex-col ">
            <header className="sticky top-0 z-50 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <Link href={"/chatbots"}>
                        <Image
                            src="/logo.svg"
                            alt="Yujin logo"
                            width={50}
                            height={50}
                        />
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
            <div className="flex flex-1">
                <aside className="fixed top-[4.5rem] left-5 w-[200px] h-[calc(100%-4rem)] overflow-y-auto  bg-background">
                    <SideNav items={sidebarConfig.sidebarNav} />
                </aside>
                <main className="ml-[200px] flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
