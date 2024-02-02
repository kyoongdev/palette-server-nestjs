import { Prisma } from '@prisma/client';

export const mixMasteringLicenseInclude = {
  license: true,
} satisfies Prisma.MixMasteringLicenseInclude;

export const mixMasteringGenreInclude = {
  genre: true,
} satisfies Prisma.MixMasteringGenreInclude;

export const mixMasteringContactInclude = {
  contact: true,
} satisfies Prisma.MixMasteringContactInclude;

export const mixMasteringMusicInclude = {
  music: true,
} satisfies Prisma.MixMasteringMusicInclude;

export const mixMasteringListInclude = {
  thumbnail: true,
  musics: {
    include: {
      music: true,
    },
  },
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
  licenses: {
    orderBy: {
      license: {
        name: 'asc',
      },
    },
  },
  musicianService: {
    include: {
      musician: {
        include: {
          user: {
            include: {
              profileImage: true,
            },
          },
        },
      },
      reviews: true,
    },
  },
} satisfies Prisma.MixMasteringInclude;

export const mixMasteringInclude = {
  ...mixMasteringListInclude,
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
} satisfies Prisma.MixMasteringInclude;
