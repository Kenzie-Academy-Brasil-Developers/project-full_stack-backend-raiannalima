import { Request, Response } from "express";
import { anouncementsServices } from "../services";
import { Anouncement } from "../entities";
import { AnouncementRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const anouncement: Anouncement = await anouncementsServices.create(req.body);
    return res.status(201).json(anouncement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const anouncements: AnouncementRead = await anouncementsServices.read();
    return res.status(200).json(anouncements);
};

export default { create, read };