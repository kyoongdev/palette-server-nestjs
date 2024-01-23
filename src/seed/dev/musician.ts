import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';

import { EncryptProvider } from '@/utils/encrypt';

export const seedMusician = async (database: PrismaClient) => {
  const encrypt = new EncryptProvider(new ConfigService());
  await database.user.create({
    data: {
      email: '9898junjun@naver.com',
      password: encrypt.hashPassword('test1234!@#$'),
      musician: {
        create: {
          bankAccount: '110-1234-1234',
          bankCode: '045',
          bankAccountOwnerName: '또로롱',
          groupType: 1,
          name: '또로롱',
          stageName: '또로롱',
          evidenceFile: {
            create: {
              extension: 'pdf',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.pdf',
            },
          },
          isAuthorized: true,
          isPending: false,
        },
      },
    },
  });
};
