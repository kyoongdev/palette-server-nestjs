import { Prisma } from '@prisma/client';

export const artistLicenseInclude = {
  license: true,
} satisfies Prisma.ArtistLicenseInclude;

export const artistContactInclude = {
  contact: true,
} satisfies Prisma.ArtistContactInclude;

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

export const artistListInclude = {
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
      reviews: true,
    },
  },
  saleTypes: {
    include: {
      saleType: true,
    },
  },
} satisfies Prisma.ArtistInclude;
