import { z } from "zod";
import { typeAccount } from "../entities/user.entity";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    cpf: z.string().max(50),
    tel: z.string().max(100),
    birth: z.string(),
    description: z.string().max(200),
    password: z.string().max(100),
    typeAccount: z.nativeEnum(typeAccount)
})

const userAddress = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    cpf: z.string().max(50),
    tel: z.string().max(100),
    birth: z.string(),
    password: z.string().max(100),
    typeAccount: z.nativeEnum(typeAccount),
    order_date: z.string().or(z.date()),
    cep: z.string().max(100),
    state: z.string().max(100),
    city: z.string().max(100),
    street: z.string().max(150),
    number: z.number().positive(),
    complement: z.string().max(100).nullable()
})

const userCreateSchema = userSchema.omit({
    id: true
})

const userAdressCreateSchema = userAddress.omit({
    order_date: true,
    id: true
})

const userReturnSchema = userSchema.omit({ password: true });
const userAddressReturnSchema = userAddress.omit({ password: true });

const userReadSchema = userReturnSchema.array();
const userUpdateSchema = userCreateSchema.partial();

export { userSchema, userCreateSchema, userUpdateSchema, userReadSchema, userReturnSchema, userAddress, userAddressReturnSchema, userAdressCreateSchema };