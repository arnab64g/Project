import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { Officer_Dro } from 'src/dto/officer_dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';

@Controller('api/officer')
export class OfficerController {
    constructor(private officeeService : OfficerService) {}
    
    @UseGuards(AuthGuard)
    @Auth(['Admin'])
    @Post()
    async addOfficer(@Body() officerDto : Officer_Dro) : Promise<string>
    {
        return await this.officeeService.addEditOfficer(officerDto);
    }
    
    @UseGuards(AuthGuard)
    @Auth(['Admin'])
    @Get()
    async getOfficer() :Promise<any>{
        return await this.officeeService.getOfficers();
    }
}
