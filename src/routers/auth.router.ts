import { Router } from "express";
import { authControllers } from "../controllers";

export const authRouter: Router = Router();

authRouter.post("/login", authControllers.loginController)

export default authRouter; 