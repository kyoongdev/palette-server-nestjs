import { PrismaClient } from '@prisma/client';

export const seedLicense = async (database: PrismaClient) => {
  await database.license.deleteMany({});

  await database.license.create({
    data: {
      name: 'BASIC',
    },
  });
  await database.license.create({
    data: {
      name: 'PREMIUM',
    },
  });
  await database.license.create({
    data: {
      name: 'UNLIMITED',
    },
  });
};
