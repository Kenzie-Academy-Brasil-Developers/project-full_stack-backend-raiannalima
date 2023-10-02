import { z } from "zod";

const commentSchema = z.object({
    id: z.number().positive(),
    comment: z.string().max(200),
})

export { commentSchema }