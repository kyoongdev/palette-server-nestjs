import { PrismaClient } from '@prisma/client';

export const seedLicense = async (database: PrismaClient) => {
  const isExist = await database.license.findFirst({});
  if (isExist) return;

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
