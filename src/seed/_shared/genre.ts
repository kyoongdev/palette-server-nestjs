import { PrismaClient } from '@prisma/client';

export const seedGenre = async (database: PrismaClient) => {
  const isExists = await database.genre.findFirst({});

  if (isExists) return;

  await database.genre.createMany({
    data: [
      {
        name: '발라드',
      },
      {
        name: '랩/힙합',
      },
      {
        name: '트로트',
      },
      {
        name: '댄스',
      },
      {
        name: 'R&B/Soul',
      },
      {
        name: '록/메탈',
      },
      {
        name: '인디음악',
      },
      {
        name: '포그/블루스',
      },
      {
        name: '그 외 장르',
        order: 99,
      },
    ],
  });
};
