import { Prisma } from '@prisma/client';

import { commonUserInclude } from './user';

export const inquiryInclude = {
  user: {
    include: commonUserInclude,
  },
} satisfies Prisma.InquiryInclude;
