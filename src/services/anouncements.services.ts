import { AppDataSource } from "../data-source";
import { Anouncement, User, Image } from "../entities";
import { AppError } from "../errors";
import { AnouncementCreate, AnouncementRead, AnouncementRepo, AnouncementRequest, AnouncementResponse, AnouncementReturn, AnouncementUpdate, UserRepo } from "../interfaces";
import { ImageArray, ImageRepo } from "../interfaces/image.interface";
import { anouncementRepository, imageRepository } from "../repositories";
import { anouncementSchema, realAnouncementSchema } from "../schemas";

const create = async (userId: string, newData: AnouncementRequest): Promise<AnouncementResponse> => {
    const anouncementRepository: AnouncementRepo = AppDataSource.getRepository(Anouncement);
    const userRepository: UserRepo = AppDataSource.getRepository(User);
    const imageGalleryRepository: ImageRepo = AppDataSource.getRepository(Image);

    const user = await userRepository.findOne({
        where: {
            id: parseInt(userId),
        },
    });

    if (!user) {
        throw new AppError("This user doesn't exist.");
    }

    if (user.typeAccount !== 'Anunciante') {
        throw new AppError("User is not Advertiser.");
    }

    const anouncement = anouncementRepository.create({ ...newData, user })
    await anouncementRepository.save(anouncement)

    newData.images.forEach(async ({ image_url }) => {
        const newImage = imageGalleryRepository.create({ image_url, anouncement })
        await imageGalleryRepository.save(newImage)
    })

    return anouncementSchema.parse(anouncement)
};

const list = async () => {
    const anouncementRepository = AppDataSource.getRepository(Anouncement)

    const anouncements = await anouncementRepository.find({ relations: ["user"] })

    return anouncements

};

const listId = async (userId: number) => {
    const anouncementRepository = AppDataSource.getRepository(Anouncement)

    const anouncement = await anouncementRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            user: true,
            comments: true,
            images: true
        }
    })

    if (!anouncement) {
        throw new AppError("Anouncement not found", 404)
    }

    return anouncement
}

const listByAdvertiser = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const anouncementRepository = AppDataSource.getRepository(Anouncement);

    const user = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            anouncements: true
        }
    })

    if (!user) {
        throw new AppError("User not found.", 404)
    }

    const anouncements = await anouncementRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            user: true
        }
    })

    return anouncements
}

const destroy = async (bodyId: string) => {
    const anouncementRepository: AnouncementRepo = AppDataSource.getRepository(Anouncement);
    const findAnouncement = await anouncementRepository.findOneBy({
        id: parseInt(bodyId),
    });

    if (!findAnouncement) {
        throw new AppError("This advertisement does't exist", 404);
    }

    await anouncementRepository.remove(findAnouncement);
    return { message: "Anouncement deleted!" };
};

const update = async (data: AnouncementUpdate, body_id: string): Promise<any> => {
    const anouncementRepository: AnouncementRepo =
        AppDataSource.getRepository(Anouncement);
    const findAnouncement = await anouncementRepository.findOne({
        where: {
            id: parseInt(body_id)
        }, relations: {
            user: true,
            comments: {
                user: true
            },
            images: true
        }
    });

    if (!findAnouncement) {
        throw new AppError("This anouncement doesn't exist.");
    }

    const updatedAnouncement = await anouncementRepository.update(body_id, {
        brand: data.brand ? data.brand : findAnouncement.brand,
        model: data.model ? data.model : findAnouncement.model,
        year: data.year ? data.year : findAnouncement.year,
        fuel: data.fuel ? data.fuel : findAnouncement.fuel,
        mileage: data.mileage ? data.mileage : findAnouncement.mileage,
        color: data.color ? data.color : findAnouncement.color,
        price_fipe: data.price_fipe ? data.price_fipe : findAnouncement.price_fipe,
        price: data.price ? data.price : findAnouncement.price,
        description: data.description ? data.description : findAnouncement.description,
        cover_image: data.cover_image ? data.cover_image : findAnouncement.cover_image,
    });

    const returnedAnouncement = await anouncementRepository.findOne({
        where: {
            id: parseInt(body_id)
        }, relations: {
            user: true,
            comments: {
                user: true
            },
            images: true
        }
    });

    return returnedAnouncement;
};

export default { create, list, destroy, update, listId, listByAdvertiser };











