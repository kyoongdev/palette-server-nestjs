import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { createNamespace, getNamespace } from 'cls-hooked';

import { PALETTE_NAMESPACE, PALETTE_PRISMA_SERVICE } from '@/common/decorator/transaction.decorator';
import { TransactionPrisma } from '@/interface/prismsa.interface';

import { PrismaService } from './prisma.service';

export class PrismaDatabase {
  getRepository() {
    const nameSpace = getNamespace(PALETTE_NAMESPACE);

    return nameSpace.get(PALETTE_PRISMA_SERVICE) as PrismaService | TransactionPrisma;
  }
}
