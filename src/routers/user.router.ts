// post, patch, delete

import { Router } from "express";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post("", userControllers.create)
userRouter.patch("/:id")
userRouter.delete("/:id")

export default userRouter;