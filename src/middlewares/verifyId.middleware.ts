import { NextFunction, Request, Response } from "express";

export const verifyId = async (req: Request, res: Response, next: NextFunction) => {
    const paramsId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);

    if (paramsId !== userId) {
        return res.status(403).json({
            message: "You do not have permission to edit/delete this user."
        })
    }

    return next()
}