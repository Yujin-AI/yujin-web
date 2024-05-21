import * as z from "zod";

export const createChatbotSchema = z.object({
    name: z.string().min(3),
    url: z.string().url(),
});
