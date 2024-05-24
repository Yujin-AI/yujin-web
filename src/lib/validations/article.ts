import * as z from "zod";

export const updateArticleSchema = z.object({
    title: z.string().min(3).max(254).optional(),
    content: z.any().optional(),
});
