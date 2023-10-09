import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { commentControllers } from "../controllers";
import { isCommentOwner } from "../middlewares/isCommentOwner.middleware";
import { isCommentOrAnouncementOwner } from "../middlewares/isCommentOrAnouncementOwner.middleware";

export const commentRouter: Router = Router();

commentRouter.post("/:id", verifyToken, commentControllers.create) // Criação de um comentário.
commentRouter.get("/:id", commentControllers.list) // Listagem de comentários de um anúncio. 
commentRouter.patch("/:id", verifyToken, isCommentOwner, commentControllers.update) // Edição de comentário.
commentRouter.delete("/:id", verifyToken, isCommentOrAnouncementOwner, commentControllers.destroy) // Deleção de comentário.

export default commentRouter;