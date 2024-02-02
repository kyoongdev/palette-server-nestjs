import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

export const seedAlbumArt = async (database: PrismaClient) => {
  const musician = await database.musician.findFirst({
    where: {
      name: '또로롱',
    },
  });

  const saleTypes = await database.albumArtSaleType.findMany({
    skip: 0,
    take: 2,
  });
  const contacts = await database.contact.findMany({});
  const licenses = await database.license.findMany({});

  await Promise.all(
    range(1, 50).map((index) =>
      database.albumArt.create({
        data: {
          musicianService: {
            create: {
              musician: {
                connect: {
                  id: musician.id,
                },
              },
            },
          },
          name: `또로롱의 ${index}번째 앨범아트`,
          description: `또로롱의 ${index}번째 앨범아트 설명`,
          updateDescription: `또로롱의 ${index}번째 앨범아트 업데이트 설명`,
          isAuthorized: true,
          isPending: false,
          images: {
            create: [
              {
                isThumbnail: true,
                image: {
                  create: {
                    extension: 'jpg',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                  },
                },
              },
              {
                isThumbnail: false,
                image: {
                  create: {
                    extension: 'jpg',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                  },
                },
              },
            ],
          },
          saleTypes: {
            create: saleTypes.map((saleType) => ({
              saleType: {
                connect: {
                  id: saleType.id,
                },
              },
            })),
          },
          contacts: {
            create: contacts.map((contact) => ({
              contact: {
                connect: {
                  id: contact.id,
                },
              },
              method: '???',
            })),
          },
          licenses: {
            create: licenses.map((license, index) => ({
              license: {
                connect: {
                  id: license.id,
                },
              },
              cost: 10000,
              draftCount: 5,
              isApplicationAvailable: index % 2 === 0,
              isCommercialUseAllowed: true,
              isCopyRightTransferAllowed: index % 2 === 0,
              isOriginFileProvided: index % 2 === 0,
              updateCount: 5,
              workPeriod: 5,
            })),
          },
        },
      })
    )
  );
};
