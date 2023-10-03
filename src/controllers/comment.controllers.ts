import { commentServices } from "../services";

const create = async (req: Request, res: Response) => {
    const newComment = await commentServices.create(
        req.params.id,
        req.user.id,
        req.body
    );
    return res.status(201).send(newComment);
};

const destroy = async (req: Request, res: Response) => {
    const { anouncement_id, comment_id } = req.params;

    await commentServices.destroy(anouncement_id, req.user.id, comment_id);

    return res.status(204).send();
};

const update = async (req: Request, res: Response) => {
    const { anouncement_id, comment_id } = req.params;

    const data = await commentServices.update(
        anouncement_id,
        req.user.id,
        comment_id,
        req.body
    );

    return res.status(200).send(data);
};

export default { create, destroy, update }