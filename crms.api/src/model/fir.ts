import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user";
import { Accused } from "./accused";
import { Fcase } from "./fcase";

@Entity()
export class Fir{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    date_lodged : Date

    @Column()
    inscident_date : Date

    @Column()
    place : string

    @Column()
    details : string
    @Column({nullable:true})
    acused_name : string
    @OneToOne(() => Fcase, (fcase) => fcase.id)
    @JoinColumn()
    fcase : Fcase | null
    @ManyToOne(() => Users, (User) => User.id)
    petitioner : Users;
    @ManyToMany(()=>Accused, (accused)=> accused.id)
    @JoinTable()
    accused : Accused[] | null
}