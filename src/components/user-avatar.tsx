import { AvatarProps } from "@radix-ui/react-avatar";

import { User } from "@/types/next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "email" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    return (
        <Avatar {...props}>
            {/* {user.image ? (
                <AvatarImage alt="Picture" src={user.image} />
            ) : ( */}
            <AvatarFallback>
                <span className="sr-only">{user.name}</span>
                <Icons.user className="h-4 w-4" />
            </AvatarFallback>
            {/* )} */}
        </Avatar>
    );
}
