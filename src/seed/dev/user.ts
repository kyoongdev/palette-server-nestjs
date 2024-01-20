import { PrismaClient } from '@prisma/client';
import { map, range } from 'lodash';

export const seedUser = async (database: PrismaClient) => {
  const users = await database.user.findMany();

  if (users.length > 0) return;

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
