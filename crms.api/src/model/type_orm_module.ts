import { DataSourceOptions } from "typeorm";
import { Users } from "./user";
import { Fir } from "./fir";
import { Accused } from "./accused";
import { Fcase } from "./fcase";
import { Investigation } from "./investigation";

export const type_orm_module : DataSourceOptions = {
    type : 'mysql',
    host : 'localhost',
    username : 'root',
    database : 'crms',
    //password : 'W7301@jqir#',
    password : 'mysql5656',
    port: 3306,
    entities : [
        Users,
        Fir,
        Accused,
        Fcase,
        Investigation
    ],
    synchronize : true,
    migrations : []
}