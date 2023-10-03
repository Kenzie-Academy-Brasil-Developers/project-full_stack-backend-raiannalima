// import { Repository } from "typeorm";
// import { AppDataSource } from "../data-source";
// import { Anouncement, Comment, User } from "../entities";
// import { AnouncementRepo, CommentCreate, CommentRepo, CommentReturn, UserRepo } from "../interfaces";
// import { commentRepository } from "../repositories";
// import { commentReadSchema, commentSchema } from "../schemas";
// import { AppError } from "../errors";

// const create = async (anouncementId: string, userId: string, commentData: Comment): Promise<CommentReturn> => {
//     const commentRepository: CommentRepo = AppDataSource.getRepository(Comment);
//     const anouncementRepository: AnouncementRepo = AppDataSource.getRepository(Anouncement);
//     const userRepository: UserRepo = AppDataSource.getRepository(User);

//     const user = await userRepository.findOneBy({ id: userId });
//     const anouncement = await anouncementRepository.findOneBy({
//         id: anouncementId,
//     });

//     const createComment: Comment = commentRepository.create({
//         ...commentData,
//         user: user!,
//         anouncement: anouncement!,
//     });

//     await commentRepository.save(createComment);

//     const newComment = commentReadSchema.parse(createComment);

//     return newComment as CommentCreate;
// };

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

// export default { create, read, destroy, update };