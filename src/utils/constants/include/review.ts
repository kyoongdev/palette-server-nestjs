import { Prisma } from '@prisma/client';

import { commonUserInclude } from './user';

export const reviewReplyInclude = {
  musician: true,
} satisfies Prisma.ServiceReviewReplyInclude;

export const reviewInclude = {
  replies: {
    include: reviewReplyInclude,
  },
  user: {
    include: commonUserInclude,
  },
} satisfies Prisma.ServiceReviewInclude;
