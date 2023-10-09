import { Router } from "express";
import { anouncementControllers } from "../controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdvertiser } from "../middlewares/isAdvertiser.middleware";
import { isAdvertiserOwner } from "../middlewares/isAdvertiserOwner.middleware";

export const anouncementRouter: Router = Router();

anouncementRouter.post("", verifyToken, anouncementControllers.create) // Registro de um anúncio. 
anouncementRouter.get("", anouncementControllers.list) // Listagem dos anúncios.
anouncementRouter.get("/advertiser/:id", anouncementControllers.listByAdvertiser) // Listagem de todos anúncios de um anunciante.
anouncementRouter.get("/:id", anouncementControllers.listId) // Listagem de um anúncio por id.
anouncementRouter.patch("/:id", verifyToken, isAdvertiserOwner, anouncementControllers.update) // Edição de anúncios. 
anouncementRouter.delete("/:id", verifyToken, isAdvertiserOwner, anouncementControllers.destroy) // Deletação um anúncio. 

export default anouncementRouter;