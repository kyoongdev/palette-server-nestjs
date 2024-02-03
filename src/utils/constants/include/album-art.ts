import { Prisma } from '@prisma/client';

export const albumArtLicenseInclude = {
  license: true,
} satisfies Prisma.AlbumArtLicenseInclude;
export const albumArtSaleTypeInclude = {
  saleType: true,
} satisfies Prisma.AlbumArtSaleTypeBridgeInclude;
export const albumArtContactInclude = {
  contact: true,
} satisfies Prisma.AlbumArtContactInclude;

export const albumArtListInclude = {
  images: {
    include: {
      image: true,
    },
  },
  saleTypes: {
    include: {
      saleType: true,
    },
    orderBy: {
      saleType: {
        order: 'asc',
      },
    },
  },
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
} satisfies Prisma.AlbumArtInclude;

export const albumArtInclude = {
  ...albumArtListInclude,
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
} satisfies Prisma.AlbumArtInclude;
