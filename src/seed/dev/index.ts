import { PrismaClient } from '@prisma/client';

import { seedContact, seedGenre, seedMood, seedRegion, seedSaleType } from '../_shared';
import { seedLicense } from '../_shared/license';

import { seedAlbumArt } from './album-art';
import { seedArtist } from './artist';
import { seedMixMastering } from './mix-mastering';
import { seedMrBeat } from './mr-beat';
import { seedMusician } from './musician';
import { seedRecording } from './recording';
import { seedUser } from './user';

export const seedDev = async (database: PrismaClient) => {
  await database.mrBeat.deleteMany();
  await database.artist.deleteMany();
  await database.recording.deleteMany();
  await database.mixMastering.deleteMany();
  await database.albumArt.deleteMany();

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
  await seedRecording(database);
  await seedMixMastering(database);
  await seedAlbumArt(database);
};
