import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fir_Accused, Fir_Dto } from 'src/dto/fir_dto';
import { Accused } from 'src/model/accused';
import { Fcase } from 'src/model/fcase';
import { Fir } from 'src/model/fir';
import { Investigation } from 'src/model/investigation';
import { Users } from 'src/model/user';
import { Equal, IsNull, Repository } from 'typeorm';

@Injectable()
export class FirService {
    constructor(@InjectRepository(Fir) private firRepository : Repository<Fir>,
                @InjectRepository(Users) private userRepository : Repository<Users>,
                @InjectRepository(Fcase) private fcaseRepository : Repository<Fcase>,
                @InjectRepository(Investigation) private investigationRepository : Repository<Investigation>,
                @InjectRepository(Accused) private accusedRepository : Repository<Accused>) {}

    async addFir(fir_dto : Fir_Dto) : Promise<number>{
        const user = await this.userRepository.findOne({where : { id : Equal(fir_dto.pretitioner_id)}})
        const fir : Fir = {
            id : fir_dto.id,
            date_lodged : fir_dto.date_lodged,
            inscident_date : fir_dto.inscident_date,
            place : fir_dto.place,
            petitioner : user,
            fcase : null,
            details : fir_dto.details,
            accused : [],
            acused_name : fir_dto.acused_name
        }
        const res = await this.firRepository.save(fir);
        const fcase : Fcase = {
            id : 0,
            section_of_law : "",
            case_status : "",
            fir : res,
            investigation: null,
        }
        
        const resc = await this.fcaseRepository.save(fcase);
        const fcae1  = await this.fcaseRepository.findOne({where : {id : res.id}});
        const fir1  = await this.firRepository.update({
            id : res.id
        },{
            fcase : fcae1
        });
        return resc.id;
    }

    async getFir(nid  : string) : Promise<Fir[]>{
        const user  = await this.userRepository.findOne({where : {id : Equal(nid)}, relations : {
        }})
        const res = await this.firRepository.find({where : {petitioner : user}})
        res.forEach(e => {
            const t = e.inscident_date.getTime() + 6*60*60*1000;
            e.inscident_date = new Date(t)
        })

        return res;
    }

    async getAllFir(id : string) : Promise<Fir[]> {
        const investigation = await this.investigationRepository.findOne({where : {id : id}})
        
        const res = await this.firRepository.find({
            relations : {
                fcase:true,
            },
            where : [
                {
                    fcase : 
                    {
                        investigation : IsNull()
                    }
                } ,
                {
                    fcase : {
                        investigation : investigation
                    }
                }               
            ]});
            console.log(res);
        
            res.forEach(e => {
                const t = e.inscident_date.getTime() + 6*60*60*1000;
                e.inscident_date = new Date(t)
            })
        return res;
    }

    async addAccused(fir_accused : Fir_Accused) : Promise<number> {
        const fir = await this.firRepository.findOne({where : {id : fir_accused.firId}, relations : {
            accused:true
        }});
        const accused = await this.accusedRepository.findOne({where : {id : fir_accused.accusedId}});
        console.log(fir.accused);
        
        if (!fir.accused) {
            fir.accused = []
        }
        
        fir.accused.push(accused);
        
        
        const res = await this.firRepository.save(fir);

        return res.id;
    }

    async removeAccused(fir_accused : Fir_Accused) : Promise<number> {
        const fir = await this.firRepository.findOne({where : {id : fir_accused.firId}, relations : {
            accused:true
        }});
        
        if (!fir.accused) {
            fir.accused = []
        }
        
        fir.accused = fir.accused.filter(x => x.id != fir_accused.accusedId);
        console.log("LIst : ", fir.accused);
        
        
        const res = await this.firRepository.save(fir);

        return res.id;
    }

    async getFirAccused(id : number) : Promise<Accused[]> {
        const fir = await this.firRepository.findOne({where : {
            id : id
        },
        relations : {
            accused : true
        }})

        return fir.accused;
    }
}
