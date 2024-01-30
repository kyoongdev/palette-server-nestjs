import { Prisma } from '@prisma/client';

export const mrBeatLicenseInclude = Prisma.validator<Prisma.MrBeatLicenseInclude>()({
  license: true,
});

export const mrBeatContactInclude = Prisma.validator<Prisma.MrBeatContactInclude>()({
  contact: true,
});

export const mrBeatDetailInclude = Prisma.validator<Prisma.MrBeatInclude>()({
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
});

export const mrBeatListInclude = Prisma.validator<Prisma.MrBeatInclude>()({
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
});
