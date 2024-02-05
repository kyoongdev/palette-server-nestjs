import { Prisma } from '@prisma/client';

export const reviewInclude = {
  replies: {
    include: {
      musician: true,
    },
  },
  user: {
    include: {
      profileImage: true,
    },
  },
} satisfies Prisma.ServiceReviewInclude;
