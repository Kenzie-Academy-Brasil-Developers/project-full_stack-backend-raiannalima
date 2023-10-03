import { Request, Response } from "express";
import { anouncementsServices } from "../services";
import { Anouncement } from "../entities";
import { AnouncementRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user.id
    const newAnouncement = await anouncementsServices.create(userId, req.body);
    return res.status(201).send(newAnouncement);
};

const destroy = async (req: Request, res: Response) => {
    const body_id: string = req.params.id;
    const deletedAnouncement = await anouncementsServices.destroy(body_id);
    return res.status(204).send(deletedAnouncement);
};

const update = async (req: Request, res: Response) => {
    const body_id: string = req.params.id;
    const updatedAnouncement = await anouncementsServices.update(
        req.body,
        body_id
    );
    return res.status(200).send(updatedAnouncement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const anouncements: AnouncementRead = await anouncementsServices.read();
    return res.status(200).json(anouncements);
};

export default { create, read, destroy, update };