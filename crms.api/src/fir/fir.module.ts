import { Module } from '@nestjs/common';
import { FirController } from './fir.controller';
import { FirService } from './fir.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fir } from 'src/model/fir';
import { Users } from 'src/model/user';
import { Fcase } from 'src/model/fcase';
import { Investigation } from 'src/model/investigation';
import { Accused } from 'src/model/accused';

@Module({
  imports:[TypeOrmModule.forFeature([Fir, Users, Fcase, Investigation, Accused])],
  controllers: [FirController],
  providers: [FirService]
})
export class FirModule {}
