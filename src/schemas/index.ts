import { userCreateSchema, userReadSchema, userReturnSchema, userSchema, userUpdateSchema } from "./user.schemas";
import { addressCreateSchema, addressReadSchema, addressSchema } from "./addresses.schemas";
import { anouncementSchema, realAnouncementSchema } from "./anouncements.schemas";
import { imageSchema } from "./images.schemas";
import { commentSchema, commentReturnSchema } from "./comment.schemas";
import { authSchema } from "./auth.schemas";

export {
    userCreateSchema, userReadSchema, userReturnSchema, userSchema,
    userUpdateSchema, addressCreateSchema, addressReadSchema, addressSchema,
    anouncementSchema, realAnouncementSchema, imageSchema, commentSchema,
    authSchema, commentReturnSchema
}