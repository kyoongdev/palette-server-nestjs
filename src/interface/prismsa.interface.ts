import { PrismaService } from '@/database/prisma.service';

export type TransactionPrisma = Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;
