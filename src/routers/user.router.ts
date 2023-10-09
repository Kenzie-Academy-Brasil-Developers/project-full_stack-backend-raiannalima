// post, patch, delete

import { Router } from "express";
import { userControllers } from "../controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const userRouter: Router = Router();

userRouter.post("", userControllers.create)
userRouter.patch("/:id", verifyToken, userControllers.update)
userRouter.delete("/:id", verifyToken, userControllers.destroy)

export default userRouter;