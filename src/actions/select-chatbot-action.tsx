"use server";

import { api } from "@/lib/api";

export async function selectChatbotAction(
    id: string
): Promise<SelectChatbotStates> {
    const selectChatbot = await api(`/chatbots/${id}/select`, {
        method: "put",
    });
    const response = await selectChatbot.json();
    return { ...response, status: selectChatbot.status };
}

export type SelectChatbotStates = {
    status: number;
    success: boolean;
    message: string;
} | null;
