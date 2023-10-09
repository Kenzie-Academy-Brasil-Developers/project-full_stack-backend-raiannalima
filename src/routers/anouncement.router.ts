import { Router } from "express";
import { anouncementControllers } from "../controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdvertiser } from "../middlewares/isAdvertiser.middleware";
import { isAdvertiserOwner } from "../middlewares/isAdvertiserOwner.middleware";

export const anouncementRouter: Router = Router();

anouncementRouter.post("", verifyToken, anouncementControllers.create) // Registro de um anuncio. 
anouncementRouter.get("", anouncementControllers.list) // Listagem dos anuncios.
anouncementRouter.get("/advertiser/:id", anouncementControllers.listByAdvertiser) // Listagem de todos anuncios de um anunciante.
anouncementRouter.get("/:id", anouncementControllers.listId) // Listagem de um anuncio por id.
anouncementRouter.patch("/:id", verifyToken, isAdvertiserOwner, anouncementControllers.update) // Edição de anuncios. 
anouncementRouter.delete("/:id", verifyToken, isAdvertiserOwner, anouncementControllers.destroy) // Deletar um anuncio. 

export default anouncementRouter;