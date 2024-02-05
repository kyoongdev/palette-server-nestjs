import { Prisma } from '@prisma/client';

import { commonMusicianInclude } from './musician';

export const musicianServiceInclude = {
  musician: {
    include: commonMusicianInclude,
  },
  reviews: true,
} satisfies Prisma.MusicianServiceInclude;
