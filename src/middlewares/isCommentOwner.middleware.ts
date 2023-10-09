import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities";
import { AppDataSource } from "../data-source";

export const isCommentOwner = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);

    const commentsRepo = AppDataSource.getRepository(Comment);

    const comment = await commentsRepo.findOne({
        where: {
            id: commentId
        },
        relations: {
            user: true
        }
    })

    if (comment!.user.id !== userId) {
        return res.status(403).json({
            message: "You do not have permission to edit this commit."
        })
    }

    return next();
}
