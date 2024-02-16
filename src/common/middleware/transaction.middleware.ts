import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

import { PrismaService } from '@/database/prisma.service';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(
    private readonly database: PrismaService,
    private readonly cls: ClsService
  ) {}
  use(_req: Request, _res: Response, next: (error?: any) => void) {
    this.cls.run(() => {
      this.cls.set(PRISMA_CLS_KEY, this.database);
      next();
    });
  }
}
