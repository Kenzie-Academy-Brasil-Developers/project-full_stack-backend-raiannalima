import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { AuthCreate, AuthToken } from "../interfaces";
import jwt from "jsonwebtoken";

const loginServices = async (payload: AuthCreate): Promise<AuthToken> => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new AppError("Email or password wrong", 401);
    }

    const validatePassword = await compare(payload.password, user.password);

    if (!validatePassword) {
        throw new AppError("Email or password wrong", 401);
    }

    const token = jwt.sign({
        typeAccount: user.typeAccount,
    }, process.env.TOKEN_SECRET_KEY!, {
        expiresIn: "24h",
        subject: user.id,
    });

    return {
        token: token,
    };
};

export default loginServices;