import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user";

@Entity()
export class Investigation{
    @PrimaryColumn()
    id: string;
    @OneToOne(() => Users)
    @JoinColumn()
    user : Users

    @Column()
    rank: string
}