import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Accused_Dto } from 'src/dto/accused_dto';
import { Accused } from 'src/model/accused';
import { Repository } from 'typeorm';

@Injectable()
export class AccusedService {
    constructor(@InjectRepository(Accused) private accusedRepository : Repository<Accused>) {}

    async addEditAccused(accused_dto : Accused_Dto) : Promise<number>{
        console.log(accused_dto);
        
        const accused0 = await this.accusedRepository.findOne({where : {id : accused_dto.id}});
        if (accused0 == null) {
            const accused : Accused = {
                id : 0,
                name : accused_dto.name,
                gender : accused_dto.gender,
                status : accused_dto.status,
                age : accused_dto.age,
                fcase : []
            }

            const res = await this.accusedRepository.save(accused);
            return res.id;
        }
        else {
            accused0.age = accused_dto.age;
            accused0.gender = accused_dto.gender,
            accused0.name = accused_dto.name,
            accused0.status = accused_dto.status

            const res  = await this.accusedRepository.save(accused0);

            return res.id;
        }
    }

    async getAccused() : Promise<Accused[]>{
        return await this.accusedRepository.find();
    }
}
