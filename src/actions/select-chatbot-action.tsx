"use server";

import { cookies } from "next/headers";

export async function selectChatbotAction(id: string) {
    cookies().set("selectedChatbot", id);
}
