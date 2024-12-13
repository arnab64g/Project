import { Module } from '@nestjs/common';
import { AccusedController } from './accused.controller';
import { AccusedService } from './accused.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accused } from 'src/model/accused';

@Module({
  imports : [TypeOrmModule.forFeature([Accused])],
  controllers: [AccusedController],
  providers: [AccusedService]
})
export class AccusedModule {}
