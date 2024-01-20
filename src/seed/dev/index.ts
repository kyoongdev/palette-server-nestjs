import { PrismaClient } from '@prisma/client';

import { seedContact, seedGenre, seedMood, seedRegion, seedSaleType } from '../_shared';
import { seedLicense } from '../_shared/license';

import { seedUser } from './user';

export const seedDev = async (database: PrismaClient) => {
  await seedLicense(database);
  await seedContact(database);
  await seedGenre(database);
  await seedMood(database);
  await seedSaleType(database);
  await seedRegion(database);
  await seedUser(database);
};
