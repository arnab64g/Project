import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginResult, UserLogin } from 'src/model/user';
import { sign_up_result, user_dto } from 'src/dto/user';
import { retry } from 'rxjs';

@Controller('api/user')
export class UserController 
{
    constructor(private userServive : UserService){}

    @Post()
    async login(@Body() user: UserLogin) : Promise<LoginResult> {
        console.log(user);
        
        return await this.userServive.login_user(user);
    }

    @Post('/register')
    async register(@Body() user : user_dto) : Promise<sign_up_result>{
        return await this.userServive.register_user(user);
    }
}
