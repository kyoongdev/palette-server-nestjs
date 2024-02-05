import { Prisma } from '@prisma/client';

import { reviewInclude } from '@/utils/constants/include/review';

export type FindReview = Prisma.ServiceReviewGetPayload<{ include: typeof reviewInclude }>;
