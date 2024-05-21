import env from "@/env.mjs";

import { getServerUser } from "./auth/server-user";

export const api = async (path: string, options: RequestInit) => {
    const user = await getServerUser();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    if (user) {
        headers.Authorization = `Bearer ${user.token.token}`;
    }

    return fetch(`${env.API_URL}${path}`, {
        ...options,
        headers,
    });
};
