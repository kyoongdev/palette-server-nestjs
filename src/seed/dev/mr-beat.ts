import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

export const seedMrBeat = async (database: PrismaClient) => {
  const musician = await database.musician.findFirst({
    where: {
      name: '또로롱',
    },
  });
  const genre = await database.genre.findFirst({});
  const mood = await database.mood.findFirst({});
  const contacts = await database.contact.findMany({});
  const licenses = await database.license.findMany({});
  await Promise.all(
    range(1, 50).map((index) =>
      database.mrBeat.create({
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
          name: `또로롱의 ${index}번째 MR/BEAT`,
          groupType: 1,
          genres: {
            create: {
              genre: {
                connect: {
                  id: genre.id,
                },
              },
            },
          },
          music: {
            create: {
              duration: 58,
              extension: 'mp3',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/file_example_MP3_1MG.mp3',
            },
          },
          isPending: false,
          isAuthorized: true,
          thumbnail: {
            create: {
              extension: 'jpg',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
            },
          },
          moods: {
            create: {
              mood: {
                connect: {
                  id: mood.id,
                },
              },
            },
          },
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
            create: licenses.map((license, idx) => ({
              license: {
                connect: {
                  id: license.id,
                },
              },
              cost: 10000,
              isArrangeAllowed: true,
              isBackgroundMusicAllowed: true,
              isMVProduceAllowed: true,
              isNewSongWithVoiceAllowed: true,
              isPerformanceActivityAllowed: idx % 2 === 0,
              isProfitActivityAllowed: idx % 2 === 0,
              isShareAllowed: true,
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
