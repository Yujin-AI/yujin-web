import env from "@/env.mjs";

export const api = (path: string, options: RequestInit) => {
    return fetch(`${env.API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
