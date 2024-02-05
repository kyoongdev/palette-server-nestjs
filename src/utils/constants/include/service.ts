import { Prisma } from '@prisma/client';

import { commonMusicianInclude } from './musician';

export const musicianServiceInclude = {
  musician: {
    include: commonMusicianInclude,
  },
  reviews: true,
} satisfies Prisma.MusicianServiceInclude;

export const adminServiceInclude = {
  albumArt: true,
  artist: true,
  mixMastering: true,
  mrBeat: true,
  recording: true,
} satisfies Prisma.MusicianServiceInclude;
