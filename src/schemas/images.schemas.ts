import { z } from "zod";

const imageSchema = z.object({
    id: z.number().positive(),
    image_url: z.string().max(200),
})

export { imageSchema }