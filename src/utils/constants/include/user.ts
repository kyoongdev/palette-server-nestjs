import { Prisma } from '@prisma/client';

export const commonUserInclude = {
  musician: true,
  profileImage: true,
} satisfies Prisma.UserInclude;

export const checkUserBySocialIdInclude = {
  musician: {
    where: {
      isAuthorized: true,
      isPending: true,
    },
  },
  profileImage: true,
} satisfies Prisma.UserInclude;
