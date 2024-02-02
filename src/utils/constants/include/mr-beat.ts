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
    orderBy: {
      contact: {
        order: 'asc',
      },
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
      reviews: true,
    },
  },
} satisfies Prisma.MrBeatInclude;
