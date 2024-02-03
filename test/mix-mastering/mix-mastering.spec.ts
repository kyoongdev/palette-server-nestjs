import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { MusicianService } from '@/modules/musician/musician.service';
import { CreateMixMasteringDTO, UpdateMixMasteringDTO } from '@/modules/services/mix-mastering/dto';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MixMasteringService } from '@/modules/services/mix-mastering/mix-mastering.service';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ClsModule, ClsService } from 'nestjs-cls';

describe('Mix Mastering Test', () => {
  let musicianService: MusicianService;
  let mixMasteringService: MixMasteringService;
  let cls: ClsService;
  let prisma: PrismaService;
  let fileRepository: FileRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PrismaDatabase,
        MusicianService,
        MusicianRepository,
        MixMasteringService,
        MixMasteringRepository,
        FileRepository,
        GenreRepository,
        ContactRepository,
        LicenseRepository,
      ],
      imports: [
        AOPModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        ClsModule.forRoot({
          global: true,
        }),
      ],
    }).compile();

    mixMasteringService = module.get<MixMasteringService>(MixMasteringService);
    musicianService = module.get<MusicianService>(MusicianService);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
    fileRepository = module.get(FileRepository);
  });

  describe('Mix Mastering Service', () => {
    it('Create Mix Mastering', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const user = await prisma.user.findFirst({
          where: {
            email: '9898junjun@naver.com',
          },
          include: {
            musician: true,
          },
        });
        const thumbnail = await prisma.image.create({
          data: {
            extension: 'jpg',
            originalName: 'test',
            url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
          },
        });

        const musics = [
          await prisma.music.create({
            data: {
              duration: 58,
              extension: 'mp3',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/file_example_MP3_1MG.mp3',
            },
          }),
          await prisma.music.create({
            data: {
              duration: 58,
              extension: 'mp3',
              originalName: 'test',
              url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/file_example_MP3_1MG.mp3',
            },
          }),
        ];

        const genre = await prisma.genre.findFirst({});
        const licenses = await prisma.license.findMany({});
        const contacts = await prisma.contact.findMany({});

        const createArgs = new CreateMixMasteringDTO({
          name: 'test',
          contacts: contacts.map((contact) => ({
            method: '???',
            contactId: contact.id,
          })),
          description: 'test',
          genreId: genre.id,
          licenses: licenses.map((license) => ({
            cost: 10000,
            draftCount: 1,
            isApplicationAvailable: true,
            isCommercialUseAllowed: true,
            isCopyRightTransferAllowed: true,
            isOriginFileProvided: true,
            licenseId: license.id,
            updateCount: 1,
            workPeriod: 20,
          })),
          musics: musics.map((music, index) => ({
            isBefore: index === 0,
            isAfter: index === 1,
            musicId: music.id,
          })),
          thumbnailId: thumbnail.id,
          updateDescription: 'test',
        });

        const mixMastering = await mixMasteringService.createMixMastering(user.musician.id, createArgs);

        expect(mixMastering).toBeDefined();

        const mixMasteringDetail = await mixMasteringService.findMixMastering(mixMastering);

        expect(mixMasteringDetail).toBeDefined();
      });
    });

    it('Update Mix Mastering', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const mixMastering = await prisma.mixMastering.findFirst({
          include: {
            musicianService: {
              include: {
                musician: true,
              },
            },
          },
        });

        const thumbnail = await prisma.image.create({
          data: {
            extension: 'jpg',
            originalName: 'test123',
            url: 'https://pallete-file.s3.ap-northeast-2.amazonaws.com/dev/tese.jpg',
          },
        });

        const genre = await prisma.genre.findFirst({
          orderBy: {
            name: 'desc',
          },
        });

        const updateArgs = new UpdateMixMasteringDTO({
          thumbnailId: thumbnail.id,
          genreId: genre.id,
        });
        await mixMasteringService.updateMixMastering(
          mixMastering.id,
          mixMastering.musicianService.musicianId,
          updateArgs
        );

        const updatedMixMastering = await mixMasteringService.findMixMastering(mixMastering.id);

        expect(updatedMixMastering).toBeDefined();
        expect(updatedMixMastering.thumbnail.id).toBe(thumbnail.id);
        expect(updatedMixMastering.genreName).toBe(genre.name);
      });
    });
  });
});
