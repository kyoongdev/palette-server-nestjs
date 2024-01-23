import { PrismaClient } from '@prisma/client';
import { map, range } from 'lodash';

export const seedUser = async (database: PrismaClient) => {
  await database.user.deleteMany();

  await database.user.create({
    data: {
      email: 'test@gmail.com',
    },
  });

  await Promise.all(
    range(1, 30).map(() =>
      database.user.create({
        data: {},
      })
    )
  );
};
