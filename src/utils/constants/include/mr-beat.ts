import type { Prisma } from '@prisma/client';

import { commonMusicianInclude } from './musician';
import { musicianServiceInclude } from './service';

export const mrBeatLicenseInclude = {
  license: true,
} satisfies Prisma.MrBeatLicenseInclude;

export const mrBeatContactInclude = {
  contact: true,
} satisfies Prisma.MrBeatContactInclude;

export const mrBeatListInclude = {
  genres: {
    include: {
      genre: true,
    },
    orderBy: {
      genre: {
        order: 'asc',
      },
    },
  },
  moods: {
    include: {
      mood: true,
    },
    orderBy: {
      mood: {
        order: 'asc',
      },
    },
  },
  music: true,
  thumbnail: true,
  licenses: true,
  musicianService: {
    include: musicianServiceInclude,
  },
} satisfies Prisma.MrBeatInclude;

export const mrBeatDetailInclude = {
  ...mrBeatListInclude,
  contacts: {
    include: {
      contact: true,
    },
    orderBy: {
      contact: {
        order: 'asc',
      },
    },
  },

  licenses: {
    include: {
      license: true,
    },
    orderBy: {
      license: {
        name: 'asc',
      },
    },
  },
} satisfies Prisma.MrBeatInclude;
