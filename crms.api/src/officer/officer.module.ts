import { Module } from '@nestjs/common';
import { OfficerController } from './officer.controller';
import { OfficerService } from './officer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investigation } from 'src/model/investigation';
import { Users } from 'src/model/user';

@Module({
  imports : [TypeOrmModule.forFeature([Investigation, Users])],
  controllers: [OfficerController],
  providers: [OfficerService]
})
export class OfficerModule {}
