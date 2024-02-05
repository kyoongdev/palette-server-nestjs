import { Prisma } from '@prisma/client';

export const commonMusicianInclude = {
  user: {
    include: {
      profileImage: true,
    },
  },
  _count: {
    select: {
      services: true,
    },
  },
} satisfies Prisma.MusicianInclude;

export const musicianInclude = {
  evidenceFile: true,
  user: {
    include: {
      profileImage: true,
    },
  },
} satisfies Prisma.MusicianInclude;
