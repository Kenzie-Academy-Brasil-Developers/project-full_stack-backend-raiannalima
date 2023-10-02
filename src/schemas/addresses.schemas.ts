import { z } from "zod";

const addressSchema = z.object({
    id: z.number().positive(),
    order_date: z.string().or(z.date()),
    cep: z.string().max(100),
    state: z.string().max(100),
    city: z.string().max(100),
    street: z.string().max(150),
    number: z.number().positive(),
    complement: z.string().max(100).nullable()
})

const addressCreateSchema = addressSchema.omit({
    id: true
});

const addressReadSchema = addressCreateSchema.array();

export { addressSchema, addressCreateSchema, addressReadSchema }

// Colocar .max em todos os campos. .max()