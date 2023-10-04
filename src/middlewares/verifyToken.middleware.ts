import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization) throw new AppError("Missing bearer token", 401);

    const [_bearer, token]: Array<string> = authorization.split(" ");

    verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if (error) {
            throw new AppError(error.message, 401);
        }
        res.locals.userId = decoded.sub
    })

    return next();
};