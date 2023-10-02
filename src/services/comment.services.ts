import { Comment } from "../entities";
import { CommentCreate } from "../interfaces";
import { commentRepository } from "../repositories";
import { commentSchema } from "../schemas";

const create = async (payload: CommentCreate): Promise<Comment> => {
    const comment: Comment = commentRepository.create(payload);
    await commentRepository.save(comment);

    return comment;
};

const read = async (): Promise<CommentCreate> => {
    return commentSchema.parse(await commentRepository.find());
};

const destroy = async (comment: Comment): Promise<void> => {
    await commentRepository.softRemove(comment);
};

export default { create, read };