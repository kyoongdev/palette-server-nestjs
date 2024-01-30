import { PrismaClient } from '@prisma/client';

import { seedContact, seedGenre, seedMood, seedRegion, seedSaleType } from '../_shared';
import { seedLicense } from '../_shared/license';

import { seedArtist } from './artist';
import { seedMrBeat } from './mr-beat';
import { seedMusician } from './musician';
import { seedUser } from './user';

export const seedDev = async (database: PrismaClient) => {
  await database.mrBeat.deleteMany();
  await database.artist.deleteMany();

  await seedLicense(database);
  await seedContact(database);
  await seedGenre(database);
  await seedMood(database);
  await seedSaleType(database);
  await seedRegion(database);
  await seedUser(database);
  await seedMusician(database);
  await seedMrBeat(database);
  await seedArtist(database);
};
