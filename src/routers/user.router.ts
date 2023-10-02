// post, patch, delete

import { Router } from "express";

export const userRouter: Router = Router();

userRouter.post("")
userRouter.patch("/:id")
userRouter.delete("/:id")

export default userRouter;