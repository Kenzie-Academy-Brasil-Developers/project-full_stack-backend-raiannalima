import { z } from "zod";

const authSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export { authSchema };