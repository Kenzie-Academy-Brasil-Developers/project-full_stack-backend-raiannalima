import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Anouncement } from "./anouncement.entity";
import { Comment } from "./comments.entity";

export enum typeAccount {
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

    @Column()
    cpf: string;

    @Column({ length: 100 })
    tel: string;

    @Column({ type: "date" })
    birth: string;

    @Column({ length: 100 })
    password: string;

    @Column({ type: 'enum', enum: typeAccount, default: typeAccount.ANUNCIANTE })
    typeAccount: typeAccount;

    @OneToMany(() => Anouncement, (anouncements) => anouncements.user)
    anouncements: Array<Anouncement>

    @OneToMany(() => Comment, (c) => c.user)
    comments: Array<Comment>

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        const passwordHashed = getRounds(this.password)
        if (!passwordHashed) {
            this.password = hashSync(this.password, 10)
        }
    }
}