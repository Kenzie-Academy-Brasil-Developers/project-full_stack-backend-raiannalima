import { NextFunction, Request, Response } from "express";
import { AnouncementRepo, UserRepo } from "../interfaces";
import { Anouncement, User } from "../entities";
import { AppDataSource } from "../data-source";

export const isAdvertiserOwner = async (req: Request, res: Response, next: NextFunction) => {
    const anouncementId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);

    const anouncementRepository: AnouncementRepo = AppDataSource.getRepository(Anouncement)

    const anouncement = await anouncementRepository.findOne({
        where: {
            id: anouncementId
        },
        relations: {
            user: true
        }
    })

    if (anouncement!.user.id !== userId) {
        return res.status(403).json({
            message: "You do not have permission to edit this ad."
        })
    }

    return next();
}
