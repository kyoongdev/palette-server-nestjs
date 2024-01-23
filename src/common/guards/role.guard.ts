import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';

import type { Request } from 'express';

import type { RoleType } from '@/interface/token.interface';

export const RoleGuard = (...roles: RoleType[]) => {
  @Injectable()
  class RoleGuardImpl implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<Request>();

      if (!req.user) throw new UnauthorizedException('로그인을 진행해주세요.');

      if (roles.includes('ADMIN') && req.user.role !== 'ADMIN') {
        throw new ForbiddenException(`${req.user.role}는 사용할 수 없습니다.`);
      }

      if (roles.includes('MUSICIAN')) {
        if (req.user.role === 'ADMIN') {
          throw new ForbiddenException(`${req.user.role}는 사용할 수 없습니다.`);
        }

        if (!roles.includes('USER') && req.user.role !== 'MUSICIAN')
          throw new ForbiddenException(`${req.user.role}는 사용할 수 없습니다.`);
      }

      if (roles.includes('USER') && req.user.role !== 'USER' && req.user.role !== 'MUSICIAN') {
        throw new ForbiddenException(`${req.user.role}는 사용할 수 없습니다.`);
      }
      return true;
    }
  }

  return mixin<RoleGuardImpl>(RoleGuardImpl);
};
