import { Prisma } from '@prisma/client';
import { range } from 'lodash';
import { nanoid } from 'nanoid';

export const mockMusicians = range(1).map((index) => ({
  bankAccount: '123',
  bankAccountOwnerName: 'ㅇㅂㄹㅇㅁ',
  bankCode: '123',
  createdAt: new Date(),
  deletedAt: undefined,
  evidenceFileUrl: 'url',
  groupType: 1,
  id: `${index}`,
  introduction: '~~~',
  isAuthorized: false,
  isPending: true,
  name: 'asdf',
  stageName: 'asdfa',
  updatedAt: new Date(),
  userId: nanoid(12),
})) as Prisma.MusicianCreateManyArgs['data'];
