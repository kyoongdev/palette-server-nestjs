import { PrismaClient } from '@prisma/client';
import { createNamespace, getNamespace } from 'cls-hooked';

import { TransactionPrisma } from '@/interface/prismsa.interface';

export const PALETTE_NAMESPACE = 'PALETTE_NAMESPACE' as const;
export const PALETTE_PRISMA_SERVICE = 'PALETTE_PRISMA_SERVICE' as const;

export function Transactional() {
  return function (_target: object, _propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originMethod = descriptor.value;

    async function transactionWrapped(...args: unknown[]) {
      const nameSpace = getNamespace(PALETTE_NAMESPACE) ?? createNamespace(PALETTE_NAMESPACE);

      const em = nameSpace.get(PALETTE_PRISMA_SERVICE) as PrismaClient;

      return await em.$transaction(async (tx: TransactionPrisma) => {
        nameSpace.set(PALETTE_PRISMA_SERVICE, tx);

        return await originMethod.apply(this, args);
      });
    }
    descriptor.value = transactionWrapped;
  };
}
