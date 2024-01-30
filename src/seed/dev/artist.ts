import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

export const seedArtist = async (database: PrismaClient) => {
  const musician = await database.musician.findFirst({
    where: {
      name: '또로롱',
    },
  });
  const contacts = await database.contact.findMany({});
  const licenses = await database.license.findMany({});
  const artistSaleTypes = await database.artistSaleType.findMany({
    skip: 0,
    take: 2,
  });
  await Promise.all(
    range(1, 50).map((index) =>
      database.artist.create({
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
          saleTypes: {
            create: artistSaleTypes.map((saleType) => ({
              saleType: {
                connect: {
                  id: saleType.id,
                },
              },
            })),
          },
          images: {
            create: [
              {
                isThumbnail: true,
                image: {
                  create: {
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                    extension: 'jpg',
                    originalName: 'test',
                  },
                },
              },
              {
                isThumbnail: false,
                image: {
                  create: {
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                    extension: 'jpg',
                    originalName: 'test',
                  },
                },
              },
            ],
          },
          name: `또로롱의 ${index}번째 Artist`,
          description: `또로롱의 ${index}번째 Artist 입니다.`,
          updateDescription: `또로롱의 ${index}번째 Artist 입니다.`,
          isPending: false,
          isAuthorized: true,
          contacts: {
            create: contacts.map((contact) => ({
              method: '???',
              contact: {
                connect: {
                  id: contact.id,
                },
              },
            })),
          },
          licenses: {
            create: licenses.map((license) => ({
              license: {
                connect: {
                  id: license.id,
                },
              },
              cost: 10000,
              draftCount: 1,
              isApplicationAvailable: true,
              isCommercialUseAllowed: true,
              isCopyRightTransferAllowed: true,
              isOriginFileProvided: true,
              updateCount: 1,
              workPeriod: 1,
              providedFiles: {
                create: [
                  {
                    extension: 'mp3',
                  },
                  {
                    extension: 'mp4',
                  },
                ],
              },
            })),
          },
        },
      })
    )
  );
};
