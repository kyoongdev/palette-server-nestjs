import { ClsService } from 'nestjs-cls';

import { PrismaService } from '@/database/prisma.service';
import { AOPDecorator, AOPParams } from '@/interface/aop.interface';

import { AOP } from '../aop.decorator';
import { PRISMA_CLS_KEY } from '../transaction/transaction';
import { createAOPDecorator } from '../utils';

export const SOCKET_PRISMA = Symbol('SOCKET_PRISMA');

export const SocketPrisma = () => createAOPDecorator(SOCKET_PRISMA);

@AOP(SOCKET_PRISMA)
export class SocketPrismaDecorator implements AOPDecorator {
  constructor(
    private readonly cls: ClsService,
    private readonly database: PrismaService
  ) {}

  execute({ method, metadata }: AOPParams<any, any>) {
    return (...args: any[]) => {
      return this.cls.run(() => {
        this.cls.set(PRISMA_CLS_KEY, this.database);

        return method(...args);
      });
    };
  }
}
