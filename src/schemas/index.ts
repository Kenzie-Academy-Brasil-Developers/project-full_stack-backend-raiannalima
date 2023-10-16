import { userCreateSchema, userReadSchema, userReturnSchema, userSchema, userUpdateSchema, userAddress, userAddressReturnSchema, userAdressCreateSchema } from "./user.schemas";
import { addressCreateSchema, addressReadSchema, addressSchema } from "./addresses.schemas";
import { anouncementSchema, realAnouncementSchema, anouncementUpdateSchema, anouncementRequest } from "./anouncements.schemas";
import { imageSchema, imageReturnSchema, imageReadSchema } from "./images.schemas";
import { commentSchema, commentReturnSchema, commentReadSchema } from "./comment.schemas";
import { authSchema } from "./auth.schemas";

export {
    userCreateSchema, userReadSchema, userReturnSchema, userSchema,
    userUpdateSchema, userAddress, userAddressReturnSchema, userAdressCreateSchema, addressCreateSchema, addressReadSchema, addressSchema,
    anouncementSchema, realAnouncementSchema, anouncementUpdateSchema, anouncementRequest, imageSchema,
    imageReturnSchema, imageReadSchema, commentSchema, commentReadSchema, commentReturnSchema,
    authSchema
}