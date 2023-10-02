import { z } from "zod";
import { realAnouncementSchema } from "../schemas";
import { Repository } from "typeorm";
import { Anouncement } from "../entities";

type AnouncementCreate = z.infer<typeof realAnouncementSchema>;

type AnouncementReturn = z.infer<typeof realAnouncementSchema>;

type AnouncementRead = z.infer<typeof realAnouncementSchema>;

type AnouncementRepo = Repository<Anouncement>;

export { AnouncementCreate, AnouncementReturn, AnouncementRead, AnouncementRepo };