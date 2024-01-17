import { PrismaClient } from '@prisma/client';

export const seedContact = async (database: PrismaClient) => {
  const isExists = await database.contact.findFirst({});

  if (isExists) return;

  await database.contact.createMany({
    data: [
      {
        name: '전화번호',
      },
      {
        name: '이메일',
      },
      {
        name: '카카오톡',
      },
      {
        name: '인스타그램',
      },
      {
        name: '기타',
        order: 99,
      },
    ],
  });
};
