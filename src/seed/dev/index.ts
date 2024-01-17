import { PrismaClient } from '@prisma/client';

import { seedContact, seedGenre, seedMood, seedSaleType } from '../_shared';
import { seedLicense } from '../_shared/license';

export const seedDev = async (database: PrismaClient) => {
  await seedLicense(database);
  await seedContact(database);
  await seedGenre(database);
  await seedMood(database);
  await seedSaleType(database);
};
