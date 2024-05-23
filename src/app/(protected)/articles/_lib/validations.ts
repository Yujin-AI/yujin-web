import * as z from "zod";

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
});

export const getArticlesSchema = searchParamsSchema;

export type GetArticlesSchema = z.infer<typeof getArticlesSchema>;
