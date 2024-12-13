import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginResult, Users, UserLogin } from 'src/model/user';
import { Equal, Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { sign_up_result, user_dto } from 'src/dto/user';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(Users) private userRepository : Repository<Users>, 
        private jwtService : JwtService) {}
    
    async login_user(user : UserLogin) : Promise<LoginResult>{
        let result : LoginResult = {
            successed : false,
            message : "",
            token : ""
        };
        
        const user0 = await this.userRepository.findOne({where : {username :Equal(user.username)}});
        if (user0) {
            const isMatched = await bycrypt.compare(user.password, user0.password);
            
            if (user0 != null && isMatched) {
                result.successed = true;
                const payload = {role : user0.role, id : user0.id};
                result.token = await this.jwtService.signAsync(payload);
            }
        }
        
        else{
            result.message = "Username of password incorrect";
        }

        return result;
    }

    async register_user(user : user_dto):Promise<sign_up_result>
    {
        let sign_up : sign_up_result = {
            successed : false,
            nid_exist : false,
            contact_exist : false,
            username_exist : false
        }
        
        const nid_exist : boolean = await this.userRepository.exists({where : {id : Equal(user.id)}});
        const contact_exist : boolean = await this.userRepository.exists({where :{contact : Equal(user.contact)}});
        const username_exist : boolean = await this.userRepository.exists({where : {username : Equal(user.username)}});

        if (nid_exist) {
            sign_up.nid_exist = true;
        }

        if(contact_exist){
            sign_up.contact_exist = true;
        }

        if(username_exist){
            sign_up.username_exist = true;
        }

        if (!nid_exist && !contact_exist && !username_exist) {
            const salt : number = 10;
            const hash : string = await bycrypt.hash(user.password, salt);

            const userEntity : Users = {
                id : user.id,
                username : user.username,
                password : hash,
                role : 'User',
                contact : user.contact,
                name : user.name
            }

            const res = await this.userRepository.save(userEntity);
            if(res){
                sign_up.successed = true;
            }
        }
        
        return sign_up;
    }
}
