import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import { getServerUser } from "@/lib/auth/server-user";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await getServerUser();
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

    const response = await api("/chatbots", {});
    const chatbots = await response.json().then((data) => data.data);

    // if (!user.defaultChatbotId && !chatbots.length) return <CreateChatbot />;

    const headersList = headers();
    const url = headersList.get("x-pathname");

    if (!user.defaultChatbotId && url !== "/chatbots") redirect("/chatbots");

    return <div className="min-h-screen overflow-hidden">{children}</div>;
}
