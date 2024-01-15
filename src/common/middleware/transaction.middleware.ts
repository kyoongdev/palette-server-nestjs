import { Injectable, NestMiddleware } from '@nestjs/common';

import { createNamespace, getNamespace, type Namespace } from 'cls-hooked';
import type { Request, Response } from 'express';

import { PrismaService } from '@/database/prisma.service';

import { PALETTE_NAMESPACE, PALETTE_PRISMA_SERVICE } from '../decorator/transaction.decorator';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(private readonly database: PrismaService) {}
  use(req: Request, res: Response, next: (error?: any) => void) {
    const namespace = getNamespace(PALETTE_NAMESPACE) ?? createNamespace(PALETTE_NAMESPACE);

    return namespace.runAndReturn(async () =>
      Promise.resolve()
        .then(() => this.setPrismaService())
        .then(next)
    );
  }

  private setPrismaService() {
    const namespace = getNamespace(PALETTE_NAMESPACE) as Namespace;
    namespace.set(PALETTE_PRISMA_SERVICE, this.database);
  }
}
