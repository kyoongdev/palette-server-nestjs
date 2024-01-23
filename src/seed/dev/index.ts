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
//https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/2302867c-85be-49b3-9d77-f936ff6d383d.PNG
