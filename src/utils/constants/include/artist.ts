import { Prisma } from '@prisma/client';

export const artistLicenseInclude = {
  license: true,
} satisfies Prisma.ArtistLicenseInclude;

export const artistContactInclude = {
  contact: true,
} satisfies Prisma.ArtistContactInclude;

export const artistSaleTypeInclude = {
  saleType: true,
} satisfies Prisma.ArtistSaleTypeBridgeInclude;

export const artistDetailInclude = {
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
    orderBy: {
      saleType: {
        order: 'asc',
      },
    },
  },
} satisfies Prisma.ArtistInclude;
