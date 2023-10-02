import { UserCreate, UserRead, UserReturn } from "../interfaces";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    const user: User = userRepository.create(payload);
    await userRepository.save(user);

    return userReturnSchema.parse(user);
};

const destroy = async (user: User): Promise<void> => {
    await userRepository.softRemove(user);
};

export default { create, destroy };