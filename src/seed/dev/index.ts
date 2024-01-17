import { PrismaClient } from '@prisma/client';

import { seedLicense } from './license';

export const seedDev = async (database: PrismaClient) => {
  await seedLicense(database);
};
