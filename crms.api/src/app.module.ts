import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { type_orm_module } from './model/type_orm_module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt_constrain';
import { FirModule } from './fir/fir.module';
import { FcaseModule } from './fcase/fcase.module';
import { OfficerModule } from './officer/officer.module';
import { AccusedModule } from './accused/accused.module';

@Module({
  imports: [UserModule, FirModule,
    TypeOrmModule.forRoot(type_orm_module),
    JwtModule.register({
      global:true,
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1y'}
    }),
    FirModule,
    FcaseModule,
    OfficerModule,
    AccusedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
