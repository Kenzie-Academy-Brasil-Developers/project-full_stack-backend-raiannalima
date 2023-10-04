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

    const anouncement = anouncementRepository.create({ ...newData, user })
    await anouncementRepository.save(anouncement)

    newData.images.forEach(async ({ image_url }) => {
        const newImage = imageGalleryRepository.create({ image_url, anouncement })
        await imageGalleryRepository.save(newImage)
    })

    return anouncementSchema.parse(anouncement)
};

const list = async (userId: number) => {
    const anouncementRepository = AppDataSource.getRepository(Anouncement)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            anouncements: true
        }
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    return user.anouncements
};

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

const update = async (data: AnouncementUpdate, body_id: string): Promise<AnouncementRead> => {
    const anouncementRepository: AnouncementRepo =
        AppDataSource.getRepository(Anouncement);
    const findAnouncement = await anouncementRepository.findOne({
        where: {
            id: body_id
        }, relations: {
            user: true,
            comments: {
                user: true
            },
            imageUrl: {
                anouncement: true
            }
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
            id: body_id
        }, relations: {
            user: true,
            comments: {
                user: true
            },
            cover_image: {
                anouncement: true
            }
        }
    })

    const validatedAnouncement =
        anouncementSchema.parse(returnedAnouncement);

    return validatedAnouncement as Anouncement;
};

export default { create, list, destroy, update };










// REFERENCIA REQUISIÇ˜AO DE CRIAÇ˜AO DE ANUNCIO - DEMOS M4 COM CAUAN: 

// const anouncementRepository: AnouncementRepo = AppDataSource.getRepository(Anouncement);
// const userRepository: UserRepo = AppDataSource.getRepository(User);
// const imageGalleryRepository: ImageRepo = AppDataSource.getRepository(Image);

// const user = await userRepository.findOne({
//     where: {
//         id: userId,
//     },
// });

// const imageGallery = newData.image_url

// const createdAnouncement: Anouncement = anouncementRepository.create({
//     brand: newData.brand,
//     model: newData.model,
//     year: newData.year,
//     fuel: newData.fuel,
//     mileage: newData.mileage,
//     color: newData.color,
//     price_fipe: newData.price_fipe,
//     price: newData.price,
//     description: newData.description,
//     cover_image: newData.cover_image,
// });

// await anouncementRepository.save(createdAnouncement);

// if (imageGallery) {
//     const newImageObj: ImageArray = imageGallery.map((image) => imageGalleryRepository.create({ image_url: image.image_url, anouncement: createdAnouncement }))
//     await imageGalleryRepository.save(newImageObj)
// }

// const createdAnouncementReturn = await anouncementRepository.findOne({
//     where: {
//         id: createdAnouncement.id,
//     },
//     relations: {
//         comments: true,
//         user: true,
//         image_url: true
//     },
// });

// const newAnouncement = anouncementSchema.parse(
//     createdAnouncementReturn
// );

// return newAnouncement as Anouncement;