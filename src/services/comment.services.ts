import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Anouncement, Comment, User } from "../entities";
import { AnouncementRepo, CommentCreate, CommentRepo, CommentReturn, UserRepo } from "../interfaces";
import { commentRepository } from "../repositories";
import { commentReadSchema, commentSchema } from "../schemas";
import { AppError } from "../errors";

export const create = async (comment: any, anouncementId: number, userId: number) => {
    const usersRepo = AppDataSource.getRepository(User);
    const anouncementRepo = AppDataSource.getRepository(Anouncement);
    const commentsRepo = AppDataSource.getRepository(Comment);

    const user = await usersRepo.findOneBy({
        id: userId
    });

    const anouncement = await anouncementRepo.findOneBy({
        id: anouncementId
    });

    const commentQuery = commentsRepo.create({
        ...comment,
        user: user,
        anouncement: anouncement,
    });

    const newComment = await commentsRepo.save(commentQuery);

    return newComment;
};

// const read = async (): Promise<CommentCreate> => {
//     return commentSchema.parse(await commentRepository.find());
// };

// const destroy = async (anouncementId: string, userId: string, commentId: string): Promise<void> => {
//     const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

//     const comment = await commentRepository.findOneBy({
//         id: commentId,
//         user: {
//             id: userId,
//         },
//         anouncement: {
//             id: anouncementId,
//         },
//     });

//     if (!comment) {
//         throw new AppError("Comment not found", 404);
//     }

//     await commentRepository.remove(comment);
// };

// const update = async (anouncementId: string, userId: string, commentId: string, commentData: Comment): Promise<Comment> => {
//     const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);
//     const comment = await commentRepository.findOneBy({
//         id: commentId,
//         user: {
//             id: userId,
//         },
//         anouncement: {
//             id: anouncementId,
//         },
//     });

//     if (!comment) {
//         throw new AppError("Comment not found.", 404);
//     }

//     const commentUpdate = await commentRepository.save({
//         ...comment,
//         user: comment.user,
//         anouncement: comment.anouncement,
//         comment: commentData.comment,
//     });

//     return commentUpdate;
// };

export default { create };