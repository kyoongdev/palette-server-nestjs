import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

export const seedMixMastering = async (database: PrismaClient) => {
  const musician = await database.musician.findFirst({
    where: {
      name: '또로롱',
    },
  });

  const genre = await database.genre.findFirst({});
  const contacts = await database.contact.findMany({});
  const licenses = await database.license.findMany({});

  await Promise.all(
    range(1, 50).map((index) =>
      database.mixMastering.create({
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
          name: `또로롱의 ${index}번째 믹스/마스터링`,
          description: `또로롱의 ${index}번째 믹스/마스터링 설명`,
          updateDescription: `또로롱의 ${index}번째 믹스/마스터링 업데이트 설명`,
          isAuthorized: true,
          isPending: false,
          thumbnail: {
            create: {
              extension: 'jpg',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
            },
          },
          musics: {
            create: [
              {
                isAfter: true,
                isBefore: false,
                music: {
                  create: {
                    duration: 58,
                    extension: 'mp3',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/file_example_MP3_1MG.mp3',
                  },
                },
              },
              {
                isAfter: false,
                isBefore: true,
                music: {
                  create: {
                    duration: 58,
                    extension: 'mp3',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/file_example_MP3_1MG.mp3',
                  },
                },
              },
            ],
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
            create: licenses.map((license, idx) => ({
              license: {
                connect: {
                  id: license.id,
                },
              },
              cost: 10000,
              draftCount: 5,
              isApplicationAvailable: idx % 2 === 0,
              isCommercialUseAllowed: idx % 2 === 0,
              isCopyRightTransferAllowed: true,
              isOriginFileProvided: true,
              updateCount: 5,
              workPeriod: 5,
            })),
          },
          genres: {
            create: {
              genre: {
                connect: {
                  id: genre.id,
                },
              },
            },
          },
        },
      })
    )
  );
};
