import { Prisma } from '@prisma/client';

export const regionLargeGroupInclude = {
  regions: {
    orderBy: {
      name: 'asc',
    },
  },
} satisfies Prisma.RegionLargeGroupInclude;
