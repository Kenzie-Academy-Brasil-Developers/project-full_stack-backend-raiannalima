import { Router } from "express";

export const commentRouter: Router = Router();

commentRouter.post("/comment") // Registro de um anuncio. 
commentRouter.get("/comment/:id") // Listagem de comentários de um anuncio. 
commentRouter.patch("/comments/:id") // Edição de comentários.
commentRouter.delete("/comments/:id") // Deleção de comentário.

export default commentRouter;