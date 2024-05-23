import { revalidatePath } from "next/cache";

import { getErrorMessage } from "@/lib/handle-error";

import { ArticleProps } from "../_types/article-types";

export async function deleteArticles(input: { ids: string[] }) {
    try {
        // await db.delete(tasks).where(inArray(tasks.id, input.ids));
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

export async function updateArticles(input: {
    ids: string[];
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
