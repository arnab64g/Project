import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Case_Dto } from 'src/dto/case_dto';
import { Accused } from 'src/model/accused';
import { Fcase } from 'src/model/fcase';
import { Fir } from 'src/model/fir';
import { Investigation } from 'src/model/investigation';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class FcaseService {
    constructor(@InjectRepository(Fcase) private fcaseRepository : Repository<Fcase> ,
                @InjectRepository(Accused) private accusedRepository : Repository<Accused>,
                @InjectRepository(Investigation) private invistigationRepository : Repository<Investigation>,
                @InjectRepository(Fir) private firRepository : Repository<Fir>) {}

    async updateFcase(case_dto : Case_Dto) : Promise<number> {
        console.log(case_dto);
        
        const investigation = await this.invistigationRepository.findOne({where : {id : Equal(case_dto.investigation)}});
        console.log("/,", investigation);
        
        const res = await this.fcaseRepository.update(
            {
                id : case_dto.id
            },
            {
                case_status : case_dto.case_status,
                section_of_law : case_dto.section_of_law,
                investigation : investigation
            }
        )
        console.log(res);
        
        return res.affected;
    }

    async getCase(id : number) : Promise<Fcase>{
        const fir = await this.firRepository.findOne({where : {id : id}});
        return await this.fcaseRepository.findOne({where: {fir : fir}});
    }
}
