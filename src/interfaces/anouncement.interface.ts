import { z } from "zod";
import { anouncementRequest, anouncementSchema, anouncementUpdateSchema, realAnouncementSchema } from "../schemas";
import { Repository } from "typeorm";
import { Anouncement } from "../entities";

type AnouncementCreate = z.infer<typeof realAnouncementSchema>;

type AnouncementReturn = z.infer<typeof realAnouncementSchema>;

type AnouncementRequest = z.infer<typeof anouncementRequest>;

type AnouncementResponse = z.infer<typeof anouncementSchema>;

type AnouncementRead = z.infer<typeof realAnouncementSchema>;

type AnouncementRepo = Repository<Anouncement>;

type AnouncementUpdate = z.infer<typeof anouncementUpdateSchema>;

export { AnouncementCreate, AnouncementReturn, AnouncementRead, AnouncementRepo, AnouncementUpdate, AnouncementResponse, AnouncementRequest };