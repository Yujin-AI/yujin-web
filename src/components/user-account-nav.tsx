"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { User } from "@/types/next-auth";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

import { buttonVariants } from "./ui/button";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, "name" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        name: user.name,
                        email: user.email,
                        // image: user.image || null,
                    }}
                    className="h-8 w-8 active:border-none focus:border-none border-none outline-none active:outline-none focus:outline-none"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && (
                            <p className="font-medium">{user.name}</p>
                        )}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault();
                        router.push("/logout");
                    }}
                >
                    <Link
                        href="/logout"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "xs" }),
                            ""
                        )}
                    >
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
