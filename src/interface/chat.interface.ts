import { Prisma } from '@prisma/client';

import { chatMessageInclude, chatRoomInclude } from '@/utils/constants/include/chat';

export type FindChatRoom = Prisma.ChatRoomGetPayload<{ include: typeof chatRoomInclude }>;
export type FindChatMessage = Prisma.ChatMessageGetPayload<{ include: typeof chatMessageInclude }>;
