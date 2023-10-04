import { loginServices } from "../services"
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response): Promise<Response> => {
    const data = await loginServices(req.body);

    return res.status(200).json(data);
}

export default { loginController };