import { Prisma } from '@prisma/client';

export const artistDetailInclude = {
  contacts: {
    include: {
      contact: true,
    },
  },
  licenses: {
    include: {
      license: true,
    },
  },
  images: {
    include: {
      image: true,
    },
  },
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
} satisfies Prisma.ArtistInclude;
