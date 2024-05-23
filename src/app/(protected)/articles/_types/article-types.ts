export type ArticleProps = {
    id: string;
    title: string;
    content: string;
    sourceUrl: string | null;
    chatbotId: string;
    sourceType: string;
    error: string | null;
    contentLength: number;
    isProcessed: boolean;
    slug: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
};
