import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Anouncement, Comment, User } from "../entities";
import { AnouncementRepo, CommentCreate, CommentRepo, CommentReturn, UserRepo } from "../interfaces";
import { commentRepository } from "../repositories";
import { commentReadSchema, commentSchema } from "../schemas";
import { AppError } from "../errors";

const create = async (comment: any, anouncementId: number, userId: number) => {
    const usersRepo = AppDataSource.getRepository(User);
    const anouncementRepo = AppDataSource.getRepository(Anouncement);
    const commentsRepo = AppDataSource.getRepository(Comment);

    const user = await usersRepo.findOneBy({
        id: userId
    });

    const anouncement = await anouncementRepo.findOneBy({
        id: anouncementId
    });

    if (!anouncement) {
        throw new AppError("Anouncement not found.", 404)
    }

    const commentQuery = commentsRepo.create({
        ...comment,
        user: user,
        anouncement: anouncement,
    });

    const newComment = await commentsRepo.save(commentQuery);

    return newComment;
};

const list = async (anouncementId: number) => {
    const anouncementRepository = AppDataSource.getRepository(Anouncement);

    const anouncement = await anouncementRepository.findOne({
        where: {
            id: anouncementId
        },
        relations: {
            comments: true
        }
    })

    if (!anouncement) {
        throw new AppError("Anouncement not found.", 404)
    }

    return anouncement.comments
}

const update = async ({ comment }: any, commentId: number) => {
    const commentsRepo = AppDataSource.getRepository(Comment);
    const commentReturn = await commentsRepo.findOneBy({ id: commentId });

    if (!commentReturn) throw new AppError("Comment not found.", 404);

    commentReturn.comment = comment

    const commentFinished = await commentsRepo.save(commentReturn);
    return commentFinished;
}

const destroy = async (userId: number, id: number): Promise<void> => {
    const commentsRepo = AppDataSource.getRepository(Comment);

    const comment = await commentsRepo.findOneBy({
        id: id,
        // user: {
        //     id: userId,
        // },
        // anouncement: {
        //     id: anouncementId,
        // },
    });

    console.log("comment:", comment)

    if (!comment) {
        throw new AppError("Comment not found.", 404);
    }

    await commentsRepo.remove(comment);
};

export default { create, list, update, destroy };