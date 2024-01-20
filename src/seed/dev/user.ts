import { PrismaClient } from '@prisma/client';
import { map, range } from 'lodash';

export const seedUser = async (database: PrismaClient) => {
  await Promise.all(
    range(1, 30).map(() =>
      database.user.create({
        data: {},
      })
    )
  );
};
