import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import { PrismaService } from '@/database/prisma.service';
import {
  RequestAdmin,
  RequestMusician,
  RequestUser,
  ReqUserType,
  Role,
  type TokenPayload,
} from '@/interface/token.interface';

import { JwtProvider } from '../jwt/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtProvider,
    private readonly database: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authorization = req.headers.authorization;

    if (!authorization) throw new UnauthorizedException('TOKEN_EMPTY');

    const splittedHeader = authorization.split(' ');
    if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer') throw new UnauthorizedException();

    const decoded: TokenPayload = this.jwt.verifyJwt<TokenPayload>(splittedHeader[1]);

    if (decoded instanceof JsonWebTokenError) throw new UnauthorizedException('TOKEN_EXPIRED');

    let isExist: ReqUserType | null = null;

    try {
      if (decoded.role === 'USER') {
        isExist = (await this.database.user.findUnique({
          where: {
            id: decoded.id,
          },
        })) as RequestUser;
      } else if (decoded.role === 'ADMIN') {
        isExist = (await this.database.admin.findUnique({
          where: {
            id: decoded.id,
          },
        })) as RequestAdmin;
      } else if (decoded.role === 'MUSICIAN') {
        isExist = (await this.database.user.findUnique({
          where: {
            id: decoded.id,
          },
          include: {
            musician: true,
          },
        })) as RequestMusician;
      }
    } catch (_e) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    req.user = {
      ...isExist,
      role: decoded.role,
    } as ReqUserType;

    return true;
  }
}
