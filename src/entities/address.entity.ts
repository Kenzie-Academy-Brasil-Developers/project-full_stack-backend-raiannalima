import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @CreateDateColumn({ type: "date" })
    order_date: string;

    @Column({ length: 100 })
    cep: string;

    @Column({ length: 100 })
    state: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 150 })
    street: string;

    @Column()
    number: number;

    @Column({ type: "text", nullable: true })
    complement?: string | undefined | null;

    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User
}