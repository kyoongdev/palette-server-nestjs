import { PrismaClient } from '@prisma/client';

export const seedSaleType = async (database: PrismaClient) => {
  await database.artistSaleType.deleteMany({});

  await database.artistSaleType.createMany({
    data: [
      {
        name: '작사',
      },
      {
        name: '피처링',
      },
      {
        name: '가이드 녹음',
      },
      {
        name: '악기 녹음',
      },
      {
        name: '프로듀싱',
      },
      {
        name: '멜로디 제작',
      },
      {
        name: '음악 교육',
      },
      {
        name: '레코드 엔지니어',
      },
      {
        name: '그 외 서비스',
        order: 99,
      },
    ],
  });
  await database.albumArtSaleType.deleteMany({});

  await database.albumArtSaleType.createMany({
    data: [
      {
        name: '사진&편집',
      },
      {
        name: '일러스트',
      },
      {
        name: '그래픽 아트',
      },
      {
        name: '그 외 장르',
        order: 99,
      },
    ],
  });
};
