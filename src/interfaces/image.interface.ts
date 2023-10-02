import { z } from "zod";
import { imageSchema } from "../schemas";
import { Repository } from "typeorm";
import { Image } from "../entities";

type ImageCreate = z.infer<typeof imageSchema>;

export { ImageCreate }