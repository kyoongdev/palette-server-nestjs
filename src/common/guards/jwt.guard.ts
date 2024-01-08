import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import { Role, type TokenPayload } from '@/interface/token.interface';

import { JwtProvider } from '../jwt/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authorization = req.headers.authorization;

    if (!authorization) throw new UnauthorizedException('TOKEN_EMPTY');

    const splittedHeader = authorization.split(' ');
    if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer')
      throw new UnauthorizedException();

    const decoded: TokenPayload = this.jwt.verifyJwt<TokenPayload>(
      splittedHeader[1],
    );

    if (decoded instanceof JsonWebTokenError)
      throw new UnauthorizedException('TOKEN_EXPIRED');

    return true;
  }
}
