import { z } from "zod";
import { typeAccount } from "../entities/user.entity";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    cpf: z.string().max(50),
    tel: z.string().max(100),
    birth: z.string(),
    password: z.string().max(50),
    typeAccount: z.nativeEnum(typeAccount)
})

const userCreateSchema = userSchema.omit({
    id: true
})

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();
const userUpdateSchema = userCreateSchema.partial();

export { userSchema, userCreateSchema, userUpdateSchema, userReadSchema, userReturnSchema };