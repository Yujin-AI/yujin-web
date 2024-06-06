import { SidebarConfig } from "@/types/nav";

export const sidebarConfig: SidebarConfig = {
    mainNav: [
        {
            title: "Documentation",
            href: "/docs",
        },
        {
            title: "Support",
            href: "/support",
            disabled: true,
        },
    ],
    sidebarNav: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "dashboard",
        },
        {
            title: "Articles",
            href: "/articles",
            icon: "articles",
        },
        {
            title: "Settings",
            href: "/settings",
            icon: "settings",
        },
    ],
};
