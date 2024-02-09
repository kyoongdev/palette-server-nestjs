import { PrismaClient } from '@prisma/client';

export const seedLicense = async (database: PrismaClient) => {
  await database.license.deleteMany();
  await database.license.create({
    data: {
      name: 'BASIC',
      order: 1,
    },
  });
  await database.license.create({
    data: {
      name: 'PREMIUM',
      order: 2,
    },
  });
  await database.license.create({
    data: {
      name: 'UNLIMITED',
      order: 3,
    },
  });
};
