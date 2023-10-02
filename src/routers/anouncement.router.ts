import { Router } from "express";

export const anouncementRouter: Router = Router();

anouncementRouter.post("/anouncements") // Registro de um anuncio. 
anouncementRouter.get("/anouncements") // Listagem dos anuncios.
anouncementRouter.get("/anouncements/:id") // Listagem de um anuncio por id.
anouncementRouter.get("/user/:id/anouncements") // Listagem de todos anuncios de um anunciante.
anouncementRouter.patch("/anouncements/:id") // Edição de anuncios. 
anouncementRouter.delete("/anouncements/:id") // Deletar um anuncio. 

export default anouncementRouter;