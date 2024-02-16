import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JsonWebTokenError } from 'jsonwebtoken';

import { PrismaService } from '@/database/prisma.service';
import { RequestAdmin, RequestMusician, ReqUserType, RoleType, TokenPayload } from '@/interface/token.interface';

import { SocketException } from '../error/socket.exception';
import { JwtProvider } from '../jwt/jwt';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtProvider,
    private readonly database: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    const authorization = client.handshake.headers.authorization;

    if (!authorization) {
      throw new SocketException({
        message: 'TOKEN_EMPTY',
        code: 401,
        path: 'HEADER',
      });
    }

    const splittedHeader = authorization.split(' ');
    if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer') {
      throw new SocketException({
        message: 'INVALID_TOKEN',
        code: 401,
        path: 'HEADER',
      });
    }

    const decoded: TokenPayload = this.jwt.verifyJwt<TokenPayload>(splittedHeader[1]);

    if (decoded instanceof JsonWebTokenError) {
      throw new SocketException({
        message: 'TOKEN_EXPIRED',
        code: 401,
        path: 'HEADER',
      });
    }

    let isExist: ReqUserType | null = null;
    let role: RoleType | null = null;

    if (decoded.role === 'USER') {
      isExist = (await this.database.user.findUnique({
        where: {
          id: decoded.id,
        },
        include: {
          musician: true,
        },
      })) as RequestMusician;
      if (isExist.musician) {
        role = 'MUSICIAN';
      } else {
        role = 'USER';
      }
    } else if (decoded.role === 'ADMIN') {
      isExist = (await this.database.admin.findUnique({
        where: {
          id: decoded.id,
        },
      })) as RequestAdmin;
      role = 'ADMIN';
    } else if (decoded.role === 'MUSICIAN') {
      isExist = (await this.database.user.findFirst({
        where: {
          id: decoded.id,
          musician: {
            isNot: null,
          },
        },
        include: {
          musician: true,
        },
      })) as RequestMusician;
      role = 'MUSICIAN';
    }
    if (!isExist) {
      throw new SocketException({
        message: '유저를 찾을 수 없습니다.',
        code: 404,
        path: 'HEADER',
      });
    }

    client.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return true;
  }
}
