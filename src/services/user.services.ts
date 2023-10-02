import { AppError } from "../errors";
import { UserCreate, UserRead, UserRepo, UserReturn, UserUpdate } from "../interfaces";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { userCreateSchema, userReadSchema, userReturnSchema } from "../schemas";
import { AppDataSource } from "../data-source";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    const user: User = userRepository.create(payload);
    await userRepository.save(user);

    const users = await userRepository.find()

    const password = payload.password
    const emailAlreadyExists = users.find(user => user.email === payload.email)

    if (emailAlreadyExists) {
        throw new AppError("User already exists.")
    }

    const cpfAlreadyExists = users.find(user => user.cpf === payload.cpf)

    if (cpfAlreadyExists) {
        throw new AppError("CPF already exists.")
    }

    if (!password) {
        throw new AppError("Password is missing.")
    }

    return userReturnSchema.parse(user);
};

const destroy = async (userId: string): Promise<void> => {
    const userRepository: UserRepo = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if (!findUser) {
        throw new AppError("User not found!", 404)
    }

    await userRepository.remove(findUser)

    return "User deleted!"
};

const update = async (updateData: UserUpdate, userId: string): Promise<UserReturn> => {
    const userRepository: UserRepo = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new AppError("Invalid id", 404)
    }

    const updatedUserObject = {
        name: updateData.name ? updateData.name : user.name,
        email: updateData.email ? updateData.email : user.email,
        cpf: updateData.cpf ? updateData.cpf : user.cpf,
        tel: updateData.tel ? updateData.cpf : user.tel,
        birth: updateData.birth ? updateData.birth : user.birth,
        password: updateData.password ? updateData.password : user.password,
        typeAccount: updateData.typeAccount ? updateData.typeAccount : user.typeAccount
    }

    const newUserUpdated = userRepository.create(updatedUserObject)

    await userRepository.update(
        userId, newUserUpdated
    )

    const updatedUser = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    return userCreateSchema.parse(updatedUser) as UserReturn
}

export default { create, destroy, update }