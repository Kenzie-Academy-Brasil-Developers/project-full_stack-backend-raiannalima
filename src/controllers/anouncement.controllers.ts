import { Request, Response } from "express";
import { anouncementsServices } from "../services";
import { Anouncement } from "../entities";
import { AnouncementRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    console.log(res.locals);
    const userId = res.locals.userId;
    const newAnouncement = await anouncementsServices.create(userId, req.body);
    return res.status(201).send(newAnouncement);
};

const destroy = async (req: Request, res: Response) => {
    const body_id = req.params.id;
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

const list = async (req: Request, res: Response): Promise<Response> => {
    const userId = res.locals.userId;
    const anouncements = await anouncementsServices.list(userId);
    // const anouncements: AnouncementRead = await anouncementsServices.list(userId);
    return res.status(200).json(anouncements);
};

export default { create, list, destroy, update };