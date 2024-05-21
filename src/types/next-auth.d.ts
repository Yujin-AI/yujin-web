import "next-auth";

export interface User {
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    defaultChatbotId: null;
    token: {
        type: string;
        name: string;
        token: string;
        abilities: string[];
        lastUsedAt: string | null;
        expiresAt: string;
    };
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }
}
