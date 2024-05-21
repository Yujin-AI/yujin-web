import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth";

export const getServerUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return session.user;
};
