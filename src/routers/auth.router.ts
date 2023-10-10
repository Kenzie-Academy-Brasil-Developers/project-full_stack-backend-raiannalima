import { Response, Router, Request } from "express";
import authControllers from "../controllers/auth.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { authSchema } from "../schemas";

export const authRouter: Router = Router();

authRouter.post("", validateBody(authSchema), (req, res) => authControllers.loginController(req, res));


export default authRouter; 