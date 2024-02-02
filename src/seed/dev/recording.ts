import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

export const seedRecording = async (database: PrismaClient) => {
  const musician = await database.musician.findFirst({
    where: {
      name: '또로롱',
    },
  });

  const region = await database.regionLargeGroup.findFirst({
    include: {
      regions: true,
    },
  });

  const licenses = await database.license.findMany({});

  await Promise.all(
    range(1, 50).map((index) =>
      database.recording.create({
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
          name: `또로롱의 ${index}번째 녹음`,
          studioName: `또로롱의 ${index}번째 녹음 스튜디오`,
          description: `또로롱의 ${index}번째 녹음 설명`,
          isEngineerSupported: index % 2 === 0,
          reservationLink: 'https://www.naver.com',
          images: {
            create: [
              {
                image: {
                  create: {
                    extension: 'jpg',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                  },
                },
                isThumbnail: true,
              },
              {
                image: {
                  create: {
                    extension: 'jpg',
                    originalName: 'test',
                    url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
                  },
                },
                isThumbnail: false,
              },
            ],
          },
          isAuthorized: true,
          isPending: false,
          licenses: {
            create: licenses.map((license) => ({
              license: {
                connect: {
                  id: license.id,
                },
              },
              cost: 10000,
              useTime: 50,
            })),
          },
          recordingRegion: {
            create: {
              regionLargeGroup: {
                connect: {
                  id: region.id,
                },
              },
              regionSmallGroup: {
                connect: {
                  id: region.regions[0].id,
                },
              },
            },
          },
        },
      })
    )
  );
};
