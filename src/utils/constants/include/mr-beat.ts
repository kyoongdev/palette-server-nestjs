import type { Prisma } from '@prisma/client';

export const mrBeatLicenseInclude = {
  license: true,
} satisfies Prisma.MrBeatLicenseInclude;

export const mrBeatContactInclude = {
  contact: true,
} satisfies Prisma.MrBeatContactInclude;

export const mrBeatDetailInclude = {
  contacts: {
    include: {
      contact: true,
    },
  },
  genres: {
    include: {
      genre: true,
    },
  },
  moods: {
    include: {
      mood: true,
    },
  },
  licenses: {
    include: {
      license: true,
    },
  },
  music: true,
  thumbnail: true,
  musicianService: {
    include: {
      musician: {
        include: {
          evidenceFile: true,
          user: {
            include: {
              profileImage: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.MrBeatInclude;

export const mrBeatListInclude = {
  genres: {
    include: {
      genre: true,
    },
  },
  moods: {
    include: {
      mood: true,
    },
  },
  music: true,
  thumbnail: true,
  musicianService: {
    include: {
      musician: {
        include: {
          evidenceFile: true,
          user: {
            include: {
              profileImage: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.MrBeatInclude;
