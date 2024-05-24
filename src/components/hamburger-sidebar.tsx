"use client";

import { useState } from "react";

import { sidebarConfig } from "@/config/sidebar-config";
import { SideNav } from "@/components/nav";

export default function HamburgerSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <button className="md:hidden p-2" onClick={toggleSidebar}>
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>
            <aside
                className={`fixed top-16 left-0 w-[200px] h-[calc(100%)] overflow-y-auto bg-background transition-transform transform md:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:block`}
            >
                <SideNav items={sidebarConfig.sidebarNav} />
            </aside>
        </>
    );
}
