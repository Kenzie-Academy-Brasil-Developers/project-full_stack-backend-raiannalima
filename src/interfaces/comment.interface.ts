import { z } from "zod";
import { commentSchema } from "../schemas";
import { Repository } from "typeorm";
import { Comment } from "../entities";

type CommentCreate = z.infer<typeof commentSchema>;

export { CommentCreate }