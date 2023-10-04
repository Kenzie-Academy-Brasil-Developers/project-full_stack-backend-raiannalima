import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Anouncement } from "./anouncement.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "text" })
    comment: string;

    @ManyToOne(() => User, (u) => u.comments, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Anouncement, (u) => u.comments, { onDelete: "CASCADE" })
    anouncement: Anouncement;
}