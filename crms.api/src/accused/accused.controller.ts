import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccusedService } from './accused.service';
import { Accused_Dto } from 'src/dto/accused_dto';
import { Accused } from 'src/model/accused';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('api/accused')
export class AccusedController {
    constructor(private accusedService : AccusedService) {}

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Post()
    async addEditAccused(@Body() accused : Accused_Dto) : Promise<number>{
        return await this.accusedService.addEditAccused(accused);
    }

    @UseGuards(AuthGuard)
    @Auth(['Officer'])
    @Get()
    async getAccused() : Promise<Accused[]>{
        return await this.accusedService.getAccused();
    }
}
