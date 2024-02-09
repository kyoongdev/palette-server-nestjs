import { Prisma } from '@prisma/client';

import { regionLargeGroupInclude } from '@/utils/constants/include/region';

export type FindRegionLargeGroup = Prisma.RegionLargeGroupGetPayload<{ include: typeof regionLargeGroupInclude }>;
