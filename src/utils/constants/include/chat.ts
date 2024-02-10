import { Prisma } from '@prisma/client';

import { commonUserInclude } from './user';

export const chatRoomInclude = {
  messages: {
    include: {
      user: {
        include: commonUserInclude,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  },
  userChatRooms: {
    include: {
      user: {
        include: commonUserInclude,
      },
    },
    orderBy: {
      order: 'asc',
    },
  },
} satisfies Prisma.ChatRoomInclude;

export const chatMessageInclude = {
  user: {
    include: commonUserInclude,
  },
} satisfies Prisma.ChatMessageInclude;
