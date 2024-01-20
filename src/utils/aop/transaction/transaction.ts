import { ConfigService } from '@nestjs/config';

import { ClsService } from 'nestjs-cls';

import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import { TransactionPrisma } from '@/interface/prismsa.interface';

import { AOP } from '../aop.decorator';
import { createAOPDecorator } from '../utils';

export const TRANSACTION = Symbol('TRANSACTION');
export const PRISMA_CLS_KEY = Symbol('PRISMA_CLS_KEY');

export const Transactional = () => createAOPDecorator(TRANSACTION);

@AOP(TRANSACTION)
export class TransactionDecorator implements AOPDecorator {
  constructor(private readonly cls: ClsService) {}

  execute({ method, metadata }: AOPParams<any, any>) {
    return async (...args: any[]) => {
      const prismaService = this.cls.get(PRISMA_CLS_KEY);
      return await prismaService.$transaction(async (tx: TransactionPrisma) => {
        this.cls.set(PRISMA_CLS_KEY, tx);

        return await method(...args);
      });
    };
  }
}
