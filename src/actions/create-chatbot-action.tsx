"use server";

import { api } from "@/lib/api";

export async function createChatbotAction(
    _prevState: CreateChatbotStates | null,
    data: FormData
): Promise<CreateChatbotStates> {
    const createChatbot = await api("/chatbots", {
        method: "post",
        body: JSON.stringify(Object.fromEntries(data)),
    });
    const response = await createChatbot.json();
    return { ...response, status: createChatbot.status };
}

export type CreateChatbotStates = {
    status: number;
    success: boolean;
    message: string;
} | null;
