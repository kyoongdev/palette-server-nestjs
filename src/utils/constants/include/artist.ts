import { Prisma } from '@prisma/client';

import { musicianServiceInclude } from './common';
import { commonMusicianInclude } from './musician';

export const artistLicenseInclude = {
  license: true,
} satisfies Prisma.ArtistLicenseInclude;

export const artistContactInclude = {
  contact: true,
} satisfies Prisma.ArtistContactInclude;

export const artistSaleTypeInclude = {
  saleType: true,
} satisfies Prisma.ArtistSaleTypeBridgeInclude;

export const artistListInclude = {
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
  images: {
    include: {
      image: true,
    },
  },
  musicianService: {
    include: musicianServiceInclude,
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
} satisfies Prisma.ArtistInclude;

export const artistDetailInclude = {
  ...artistListInclude,
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
} satisfies Prisma.ArtistInclude;
