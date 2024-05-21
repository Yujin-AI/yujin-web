"use server";

import { api } from "@/lib/api";

export async function signupAction(
    _prevState: SignupStates | null,
    data: FormData
): Promise<SignupStates> {
    console.log("signupActionData", data);
    const signup = await api("/auth/signup", {
        method: "post",
        body: JSON.stringify(Object.fromEntries(data)),
    });
    console.log("signupAction", signup);
    const response = await signup.json();
    console.log("signupActionResponse", response);
    return { ...response, status: signup.status };
}

export type SignupStates = {
    status: number;
    success: boolean;
    message: string;
} | null;
