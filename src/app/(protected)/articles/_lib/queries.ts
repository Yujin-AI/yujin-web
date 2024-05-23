import { unstable_noStore as noStore } from "next/cache";

import "server-only";

import { cookies } from "next/headers";

import { api } from "@/lib/api";

import { ArticleProps } from "../_types/article-types";
import { GetArticlesSchema } from "./validations";

export const getArticles = async (input: GetArticlesSchema) => {
    noStore();
    const { page, limit, sort, title, status, priority, operator, from, to } =
        input;
    const chatbotId = cookies().get("selectedChatbot");
    try {
        // Column and order to sort by
        // Splitting the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]

        const res = (await api(`/${chatbotId}/articles`, {}).then((res) =>
            res.json()
        )) as { success: boolean; meta: any; data: ArticleProps[] };

        const data = res.data;
        const pageCount = res.meta.lastPage;
        return { data, pageCount };

        // const pageCount = Math.ceil(total / limit);
        // return { data, pageCount };
    } catch (err) {
        const data: ArticleProps[] = [];
        return { data, pageCount: 0 };
    }
};
