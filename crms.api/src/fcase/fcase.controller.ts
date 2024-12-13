import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { FcaseService } from './fcase.service';
import { Case_Dto } from 'src/dto/case_dto';
import { Fcase } from 'src/model/fcase';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('api/case')
export class FcaseController {
    constructor(private fcaseService : FcaseService) {}

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Put()
    async updateFcase(@Body() case_dto : Case_Dto){
        return await this.fcaseService.updateFcase(case_dto);
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer', 'User'])
    @Get()
    async getCase(@Req() req : any) : Promise<Fcase>{
        return await this.fcaseService.getCase(req.query.id);
    }
}