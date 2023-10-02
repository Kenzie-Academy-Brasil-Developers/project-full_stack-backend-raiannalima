import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    cpf: z.number().positive(),
    tel: z.string().max(100),
    birth: z.string().or(z.date()).nullable(),
    password: z.string().max(50),
    typeAccount: z.enum(['Comprador', 'Anunciante'])
})

const userCreateSchema = userSchema.omit({
    id: true
})

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();
const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial();

export { userSchema, userCreateSchema, userUpdateSchema, userReadSchema, userReturnSchema };