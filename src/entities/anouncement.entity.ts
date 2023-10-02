import { Column, CreateDateColumn, Decimal128, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Image } from "./images.entity";
import { Comments } from "./comments.entity";

@Entity("anouncements")
export class Anouncement {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 50 })
    brand: string;

    @Column({ length: 50 })
    model: string;

    @Column({ length: 50 })
    year: number;

    @Column({ length: 150 })
    fuel: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    mileage: number;

    @Column({ length: 50 })
    color: string;

    @Column({ length: 50 })
    price_fipe: number;

    @Column({ length: 50 })
    price: number;

    @Column({ type: "text", nullable: true })
    description?: string | undefined | null;

    @Column({ length: 200 })
    cover_image: string;

    @ManyToOne(() => User, (user) => user.anouncements)
    user: User;

    @OneToMany(() => Image, (images) => images.anouncement)
    images: Array<Image>

    @OneToMany(() => Comments, (c) => c.anouncement)
    comments: Array<Comments>
}