import { Router } from "express";
import { anouncementControllers } from "../controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const anouncementRouter: Router = Router();

anouncementRouter.post("", verifyToken, anouncementControllers.create) // Registro de um anuncio. 
anouncementRouter.get("", verifyToken, anouncementControllers.list) // Listagem dos anuncios.
// anouncementRouter.get("/anouncements/:id") // Listagem de um anuncio por id.
// anouncementRouter.get("/user/:id/anouncements") // Listagem de todos anuncios de um anunciante.
anouncementRouter.patch("/:id", verifyToken, anouncementControllers.update) // Edição de anuncios. 
anouncementRouter.delete("/:id", verifyToken, anouncementControllers.destroy) // Deletar um anuncio. 

export default anouncementRouter;