import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Anouncement } from "./anouncement.entity";
import { Comments } from "./comments.entity";

enum typeAccount {
    COMPRADOR = 'Comprador',
    ANUNCIANTE = 'Anunciante'
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 120 })
    cpf: number;

    @Column({ length: 100 })
    tel: string;

    @CreateDateColumn({ type: "date" })
    birth: string;

    @Column({ length: 50 })
    password: string;

    @Column({ type: 'enum', enum: typeAccount, default: typeAccount.ANUNCIANTE })
    typeAccount: typeAccount;

    @OneToMany(() => Anouncement, (anouncements) => anouncements.user)
    anouncements: Array<Anouncement>

    @OneToMany(() => Comments, (c) => c.user)
    comments: Array<Comments>
}