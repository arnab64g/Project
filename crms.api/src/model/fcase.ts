import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fir } from "./fir";
import { Investigation } from "./investigation";

@Entity()
export class Fcase{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    case_status : string

    @Column()
    section_of_law : string

    @OneToOne(() => Fir, (fir) => fir.id)
    @JoinColumn()
    fir : Fir

    @ManyToOne(() => Investigation, (Investigation) => Investigation.id)
    @JoinColumn()
    investigation : Investigation | null
}