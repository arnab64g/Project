import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './auth.decorator';
import { jwtConstants } from './jwt_constrain';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService : JwtService, private reflector : Reflector) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    let payload : any;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret : jwtConstants.secret,
      })
      
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    if (!roles) {
      return true;
    }

    if (roles.find(x => x == payload.role)) {
      return true;
    }
    else{
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request : Request) : string | undefined {
    const [type, token] = request.headers.authorization?.split?.(' ')??[];
    return type === 'bearer' ? token : undefined;
  }
}
