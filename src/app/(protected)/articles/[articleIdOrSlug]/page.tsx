import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { api } from "@/lib/api";

import { ArticleProps } from "../_types/article-types";
import MDXEditor from "./_components/mdx-editor";

interface ArticlePageProps {
    params: { articleIdOrSlug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { articleIdOrSlug } = params;
    const chatbotId = cookies().get("selectedChatbot")?.value;
    const res = await api(`/${chatbotId}/articles/${articleIdOrSlug}`, {}).then(
        (res) => res.json()
    );
    const article = res.data as ArticleProps;
    if (!article) {
        return notFound();
    }

    return <MDXEditor article={article} />;
}
