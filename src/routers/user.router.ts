// post, patch, delete

import { Router } from "express";
import { userControllers } from "../controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { idExists } from "../middlewares/idExists.middleware";
import { verifyId } from "../middlewares/verifyId.middleware";

export const userRouter: Router = Router();

userRouter.post("", userControllers.create)
userRouter.patch("/:id", verifyToken, verifyId, userControllers.update)
userRouter.delete("/:id", verifyToken, verifyId, userControllers.destroy)
userRouter.get("/:id", userControllers.listId)

export default userRouter;