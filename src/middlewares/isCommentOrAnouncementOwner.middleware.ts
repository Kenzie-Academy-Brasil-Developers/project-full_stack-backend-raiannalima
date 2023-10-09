import { NextFunction, Request, Response } from "express";
import { Anouncement, Comment } from "../entities";
import { AppDataSource } from "../data-source";

export const isCommentOrAnouncementOwner = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);
    const typeAccount = res.locals.typeAccount;

    const commentsRepo = AppDataSource.getRepository(Comment);
    const anouncementRepo = AppDataSource.getRepository(Anouncement);

    const comment = await commentsRepo.findOne({
        where: {
            id: commentId
        },
        relations: {
            user: true,
            anouncement: true
        }
    })

    const anouncements = await anouncementRepo.findOne({
        where: {
            id: comment!.anouncement.id
        },
        relations: {
            user: true
        }
    })

    console.log("--------", comment?.user.id, userId, typeAccount)
    console.log("========", anouncements!.user.id)

    if (comment!.user.id !== userId && anouncements!.user.id !== userId) {
        return res.status(403).json({
            message: "You do not have permission to edit this commit."
        })
    }

    return next();
}
