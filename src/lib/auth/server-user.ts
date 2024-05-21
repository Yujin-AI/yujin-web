import { getServerSession } from "next-auth/next";

import { api } from "../api";
import { authOptions } from "./auth";

export const getServerUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return session.user;
};

export const getDBUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const token = session.user.token;
    const res = await api("/auth/me", {});
    const user = await res.json();
    if (!user.success) return null;
    return { ...user.data, token };
};
