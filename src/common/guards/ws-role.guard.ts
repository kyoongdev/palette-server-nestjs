import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';

import type { RoleType } from '@/interface/token.interface';

export const WsRoleGuard = (...roles: RoleType[]) => {
  @Injectable()
  class WsRoleGuardImpl implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const client = context.switchToWs().getClient();

      if (!client.user) throw new UnauthorizedException('로그인을 진행해주세요.');

      if (roles.includes('ADMIN') && client.user.role !== 'ADMIN') {
        throw new ForbiddenException(`${client.user.role}는 사용할 수 없습니다.`);
      }

      if (roles.includes('MUSICIAN')) {
        if (client.user.role === 'ADMIN') {
          throw new ForbiddenException(`${client.user.role}는 사용할 수 없습니다.`);
        }

        if (!roles.includes('USER') && client.user.role !== 'MUSICIAN')
          throw new ForbiddenException(`${client.user.role}는 사용할 수 없습니다.`);
      }

      if (roles.includes('USER') && client.user.role !== 'USER' && client.user.role !== 'MUSICIAN') {
        throw new ForbiddenException(`${client.user.role}는 사용할 수 없습니다.`);
      }
      return true;
    }
  }

  return mixin<WsRoleGuardImpl>(WsRoleGuardImpl);
};
