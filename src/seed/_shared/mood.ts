import { PrismaClient } from '@prisma/client';

export const seedMood = async (database: PrismaClient) => {
  await database.mood.deleteMany({});

  await database.mood.createMany({
    data: [
      {
        name: '행복한',
      },
      {
        name: '밝은',
      },
      {
        name: '신나는',
      },
      {
        name: '흥분되는',
      },
      {
        name: '차분한',
      },
      {
        name: '낭만적인',
      },
      {
        name: '로맨스',
      },
      {
        name: '섹시한',
      },
      {
        name: '몽환적인',
      },
      {
        name: '긴장되는',
      },
      {
        name: '어두운',
      },
      {
        name: '슬픈',
      },
      {
        name: '우울한',
      },
    ],
  });
};
