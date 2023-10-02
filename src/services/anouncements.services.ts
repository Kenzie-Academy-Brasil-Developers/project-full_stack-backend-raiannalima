import { Anouncement } from "../entities";
import { AnouncementCreate, AnouncementRead } from "../interfaces";
import { anouncementRepository } from "../repositories";
import { anouncementSchema } from "../schemas";

const create = async (payload: AnouncementCreate): Promise<Anouncement> => {
    const anouncement: Anouncement = anouncementRepository.create(payload);
    await anouncementRepository.save(anouncement);

    return anouncement;
};

const read = async (): Promise<AnouncementRead> => {
    return anouncementSchema.parse(await anouncementRepository.find());
};

const destroy = async (anouncement: Anouncement): Promise<void> => {
    await anouncementRepository.softRemove(anouncement);
};

export default { create, read };