import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { FileService } from '@/modules/file/file.service';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { MusicianService } from '@/modules/musician/musician.service';
import { CreateMrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { MrBeatService } from '@/modules/services/mr-beat/mr-beat.service';
import { ValidateServiceModule } from '@/modules/services/validation/validate-service.module';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY, TransactionDecorator } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { before } from 'lodash';
import { ClsModule, ClsService } from 'nestjs-cls';

describe('Mr Beat Test', () => {
  let musicianService: MusicianService;
  let mrBeatService: MrBeatService;
  let cls: ClsService;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PrismaDatabase,
        MusicianRepository,
        MusicianService,
        TransactionDecorator,
        MrBeatService,
        MrBeatRepository,
        FileRepository,
        LicenseRepository,
        ContactRepository,
        MoodRepository,
        GenreRepository,
      ],
      imports: [
        ValidateServiceModule,
        AOPModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        ClsModule.forRoot({
          global: true,
        }),
      ],
    }).compile();

    mrBeatService = module.get<MrBeatService>(MrBeatService);
    musicianService = module.get<MusicianService>(MusicianService);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
  });

  describe('Mr Beat Service', () => {
    it('test', () => {});
    it('Create Mr Beat', async () => {
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
        const mood = await prisma.mood.findFirst({});
        const genre = await prisma.genre.findFirst({});
        const licenses = await prisma.license.findMany({});
        const contacts = await prisma.contact.findMany({});
        const music = await prisma.music.create({
          data: {
            duration: 100,
            extension: 'mp3',
            originalName: 'asdf',
            url: 'asdf',
          },
        });
        const thumbnail = await prisma.image.create({
          data: {
            extension: 'jpg',
            originalName: 'asdf',
            url: 'asdf',
          },
        });
        const createMrBeatDTO = new CreateMrBeatDTO({
          contacts: contacts.map((contact) => ({
            contactId: contact.id,
            method: 'test',
          })),
          genreId: genre.id,
          groupType: 1,
          licenses: licenses.map((license, index) => ({
            cost: 1000 * (index + 1),
            isArrangeAllowed: true,
            isBackgroundMusicAllowed: true,
            isMVProduceAllowed: true,
            isNewSongWithVoiceAllowed: true,
            isPerformanceActivityAllowed: true,
            isProfitActivityAllowed: true,
            isShareAllowed: true,
            licenseId: license.id,
            usePeriod: '1년',
          })),
          moodId: mood.id,
          musicId: music.id,
          name: 'test',
          thumbnailId: thumbnail.id,
        });
        const result = await mrBeatService.createMrBeat(user.musician.id, createMrBeatDTO);
        expect(result).toBeDefined();
        const mrBeat = await mrBeatService.findMrBeat(result);
        expect(mrBeat.isPending).toBe(true);
        expect(mrBeat.isAuthorized).toBe(false);
      });
    });
    it('Update MR Beat', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const mrBeat = await prisma.mrBeat.findFirst({
          include: {
            musicianService: {
              include: {
                musician: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        });
        const contacts = await prisma.contact.findMany({
          skip: 0,
          take: 3,
        });
        const genre = await prisma.genre.findFirst({
          where: {
            name: '인디음악',
          },
        });
        const mood = await prisma.mood.findFirst({
          where: {
            name: '섹시한',
          },
        });
        const updateMrBeatDTO = new UpdateMrBeatDTO({
          contacts: contacts.map((contact) => ({
            contactId: contact.id,
            method: 'test123',
          })),
          name: 'test1235',
          genreId: genre.id,
          moodId: mood.id,
        });
        await mrBeatService.updateMrBeat(mrBeat.id, mrBeat.musicianService.musicianId, updateMrBeatDTO);
        const updatedMrBeat = await mrBeatService.findMrBeat(mrBeat.id);
        expect(updatedMrBeat).toBeDefined();
        expect(updatedMrBeat.name).toBe('test1235');
        expect(updatedMrBeat.genreName).toBe('인디음악');
        expect(updatedMrBeat.moodName).toBe('섹시한');
        expect(updatedMrBeat.contacts.length).toBe(3);
        expect(updatedMrBeat.contacts[0].method).toBe('test123');
      });
    });
  });
});
