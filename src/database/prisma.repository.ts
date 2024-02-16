import { Injectable } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import { TransactionPrisma } from '@/interface/prismsa.interface';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';

import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaDatabase {
  constructor(private readonly cls: ClsService) {}

  getRepository() {
    console.log('repository', this.cls, typeof this.cls.get(PRISMA_CLS_KEY));

    return this.cls.get(PRISMA_CLS_KEY) as PrismaService | TransactionPrisma;
  }
}
