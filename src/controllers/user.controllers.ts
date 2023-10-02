import { Request, Response } from "express";
import { UserRead, UserReturn, UserUpdate } from "../interfaces";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await userServices.create(req.body);
    return res.status(201).json(user);
};

const destroy = async (req: Request, res: Response) => {
    const userId = req.user.id
    const response = await userServices.destroy(userId);

    return res.status(204).send(response)
}

const update = async (req: Request, res: Response) => {
    const updatedData: UserUpdate = req.body
    const userUpdate = req.user.id
    const updatedUser = await userServices.update(updatedData, userUpdate)
    return res.send(updatedUser)
}

export default { create, destroy, update };
