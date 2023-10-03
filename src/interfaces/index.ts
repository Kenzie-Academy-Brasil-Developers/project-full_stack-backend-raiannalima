import { UserCreate, UserRead, UserRepo, UserReturn, UserUpdate } from "./user.interfaces";
import { AddressCreate, AddressRead, AddressRepo } from "./address.interface";
import { AnouncementCreate, AnouncementReturn, AnouncementRead, AnouncementRepo, AnouncementUpdate } from "./anouncement.interface"
import { ImageCreate, ImageRepo, ImageArray } from "./image.interface";
import { CommentCreate, CommentReturn, CommentArray, CommentRepo } from "./comment.interface";
import { AuthCreate, AuthToken } from "./auth.interface";

export {
    UserCreate, UserRead, UserRepo, UserReturn, UserUpdate, AddressCreate, AddressRead, AddressRepo,
    AnouncementCreate, AnouncementReturn, AnouncementRead, AnouncementRepo, AnouncementUpdate, ImageCreate, ImageRepo, ImageArray,
    CommentCreate, CommentReturn, CommentArray, CommentRepo, AuthCreate, AuthToken
};