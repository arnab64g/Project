import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FirService } from './fir.service';
import { Fir_Accused, Fir_Dto } from 'src/dto/fir_dto';
import { Fir } from 'src/model/fir';
import { Accused } from 'src/model/accused';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('api/fir')
export class FirController {
    constructor(private firService: FirService) {}
    
    @UseGuards(AuthGuard)
    @Auth(['User'])
    @Post()
    async addFir(@Body() fir : Fir_Dto) : Promise<number> {
        return await this.firService.addFir(fir);
    }

    @UseGuards(AuthGuard)
    @Auth(['User'])
    @Get(':id')
    async getFir(@Param() params: any) : Promise<Fir[]>{
        return await this.firService.getFir(params.id)
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Get('/officer/:id')
    async getFirs(@Param() params: any) : Promise<Fir[]>{
        return await this.firService.getAllFir(params.id);
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Put()
    async updateFir(@Body() fir_accused : Fir_Accused) : Promise<number>
    {
        return await this.firService.addAccused(fir_accused);
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Put('/delete')
    async updateFirR(@Body() fir_accused : Fir_Accused) : Promise<number>
    {
        return await this.firService.removeAccused(fir_accused);
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer', 'User'])
    @Get('/accused/:id')
    async getAccused(@Param() param : any) : Promise<Accused[]> 
    {
        return await this.firService.getFirAccused(param.id);
    }
}


