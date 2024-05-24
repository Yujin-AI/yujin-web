"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/handle-error";

import { ArticleProps } from "../_types/article-types";

export async function deleteArticles(input: { ids: string[] }) {
    try {
        const chatbotId = cookies().get("selectedChatbot")?.value;
        const queryParam = input.ids.map((id) => `ids[]=${id}`).join("&");
        await api(`/${chatbotId}/articles?${queryParam}`, { method: "DELETE" });

        revalidatePath("/");

        return {
            data: null,
            error: null,
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err),
        };
    }
}

export async function updateArticles(input: {
    id: string;
    isProcessed?: ArticleProps["isProcessed"];
    isPublished?: ArticleProps["isPublished"];
}) {
    try {
        // await db.update(tasks).where(inArray(tasks.id, input.ids));
        // todo)) backend implementation needed

        revalidatePath("/");

        return {
            data: null,
            error: null,
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err),
        };
    }
}
