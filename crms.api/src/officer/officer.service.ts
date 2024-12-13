import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Officer_Dro } from 'src/dto/officer_dto';
import { Investigation } from 'src/model/investigation';
import { Users } from 'src/model/user';
import { Repository } from 'typeorm';

@Injectable()
export class OfficerService {
    constructor(@InjectRepository(Investigation) private investigatioRepository : Repository<Investigation>,
                @InjectRepository(Users) private userRepository : Repository<Users>) {}

    async addEditOfficer(officer_dto : Officer_Dro) : Promise<string>{
        const officer0 = await this.investigatioRepository.findOne({where:{id:officer_dto.id}});
        const user = await this.userRepository.findOne({where:{id : officer_dto.id}});
        if (officer0 == null) {
            const officer : Investigation = {
                id : officer_dto.id,
                rank : officer_dto.rank,
                user : user
            }
            user.role = "Officer";
            await this.userRepository.save(user);
            const res = await this.investigatioRepository.save(officer);
            return res.id;
        }
        else{
            officer0.rank = officer_dto.rank;
        }

        const res = await this.investigatioRepository.save(officer0);
        return res.id;
    }

    async getOfficers() : Promise<any> {
        const res = await this.investigatioRepository.find({relations :{user : true}, select : {
            id : true,
            rank : true,
            user : {
                name : true
            }
        }});
        return res;
    }
}
