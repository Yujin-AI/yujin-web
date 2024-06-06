"use server";

import { api } from "@/lib/api";

export async function signupAction(
    _prevState: SignupStates | null,
    data: FormData
): Promise<SignupStates> {
    const signup = await api("/auth/signup", {
        method: "post",
        body: JSON.stringify(Object.fromEntries(data)),
    });
    const response = await signup.json();
    return { ...response, status: signup.status };
}

export type SignupStates = {
    status: number;
    success: boolean;
    message: string;
} | null;
