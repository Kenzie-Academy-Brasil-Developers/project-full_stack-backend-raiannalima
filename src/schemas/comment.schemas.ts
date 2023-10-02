import { z } from "zod";
import { userSchema } from "./user.schemas";

const commentSchema = z.object({
    id: z.number().positive(),
    comment: z.string().max(200),
})

const commentReturnSchema = commentSchema.extend({
    user: userSchema
})

export { commentSchema, commentReturnSchema }