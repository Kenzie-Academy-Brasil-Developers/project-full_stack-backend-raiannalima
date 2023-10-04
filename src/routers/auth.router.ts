import { Response, Router, Request } from "express";
import authControllers from "../controllers/auth.controllers";

export const authRouter: Router = Router();

authRouter.post("", (req, res) => authControllers.loginController(req, res));

export default authRouter; 