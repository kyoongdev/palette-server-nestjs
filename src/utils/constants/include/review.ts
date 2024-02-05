import { Prisma } from '@prisma/client';

import { commonUserInclude } from './user';

export const reviewInclude = {
  replies: {
    include: {
      musician: true,
    },
  },
  user: {
    include: commonUserInclude,
  },
} satisfies Prisma.ServiceReviewInclude;
