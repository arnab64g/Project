import internal from "stream";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Investigation } from "./investigation";

@Entity()
export class Users {
    @PrimaryColumn()
    id : string

    @Column()
    name : string

    @Column()
    username : string

    @Column()
    contact : string

    @Column()
    password : string

    @Column()
    role : string;
}

export interface UserLogin{
    username : string;
    password : string;
}

export interface LoginResult{
    successed : boolean;
    message : string;
    token : string;
}

export interface ApiResult{
    successed : boolean;
    message : string;
}
