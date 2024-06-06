import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerUser } from "@/lib/auth/server-user";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const DashboardPage = async () => {
    const user = await getServerUser();

    if (!user) redirect("/login");

    return (
        <div>
            <h1>Dashboard</h1>
            {JSON.stringify(user, null, 2)}

            <Link
                href="/logout"
                className={cn(buttonVariants({ variant: "default" }))}
            >
                Logout
            </Link>
        </div>
    );
};

export default DashboardPage;
