import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { MusicianService } from '@/modules/musician/musician.service';
import { RegionRepository } from '@/modules/region/region.repository';
import { CreateRecordingDTO, UpdateRecordingDTO } from '@/modules/services/recording/dto';
import { RECORDING_ERROR_CODE } from '@/modules/services/recording/exception/error-code';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';
import { RecordingService } from '@/modules/services/recording/recording.service';
import { VALIDATE_SERVICE_ERROR_CODE } from '@/modules/services/validation/exception/error-code';
import { ValidateServiceModule } from '@/modules/services/validation/validate-service.module';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY, TransactionDecorator } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ClsModule, ClsService } from 'nestjs-cls';

describe('Recording Test', () => {
  let musicianService: MusicianService;
  let recordingService: RecordingService;
  let cls: ClsService;
  let prisma: PrismaService;
  let fileRepository: FileRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PrismaDatabase,
        MusicianService,
        RecordingService,
        TransactionDecorator,
        MusicianRepository,
        LicenseRepository,
        FileRepository,
        RegionRepository,
        RecordingRepository,
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

    recordingService = module.get<RecordingService>(RecordingService);
    musicianService = module.get<MusicianService>(MusicianService);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
    fileRepository = module.get(FileRepository);
  });

  describe('Recording Service', () => {
    it('Create Recording', async () => {
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
        const images = [
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
        ];

        const licenses = await prisma.license.findMany({});
        const region = await prisma.regionLargeGroup.findFirst({
          include: {
            regions: true,
          },
        });
        const createArgs = new CreateRecordingDTO({
          name: 'Recording Test',
          description: 'Recording Test Description',
          images: images.map((image, index) => ({
            isThumbnail: index === 0,
            imageId: image.id,
          })),
          isEngineerSupported: true,
          licenses: licenses.map((license) => ({
            cost: 5000,
            licenseId: license.id,
            useTime: 60,
          })),
          region: {
            regionLargeGroupId: region.id,
            ...(region.regions[0] && { regionSmallGroupId: region.regions[0].id }),
          },
          reservationLink: 'https://www.naver.com',
          studioName: 'Recording Studio',
        });

        const recording = await recordingService.createRecording(user.musician.id, createArgs);

        expect(recording).toBeDefined();
        const recordingDetail = await recordingService.findRecording(recording);

        expect(recordingDetail).toBeDefined();
      });
    });

    it('Create Recording Error', async () => {
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
        const images = [
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
        ];

        const licenses = await prisma.license.findMany({});
        const region = await prisma.regionLargeGroup.findFirst({
          include: {
            regions: true,
          },
        });
        const createArgs = new CreateRecordingDTO({
          name: 'Recording Test',
          description: 'Recording Test Description',
          images: images.map((image, index) => ({
            isThumbnail: index === 0,
            imageId: image.id,
          })),
          isEngineerSupported: true,
          licenses: licenses.map((license) => ({
            cost: 5000,
            licenseId: licenses[0].id,
            useTime: 60,
          })),
          region: {
            regionLargeGroupId: region.id,
            ...(region.regions[0] && { regionSmallGroupId: region.regions[0].id }),
          },
          reservationLink: 'https://www.naver.com',
          studioName: 'Recording Studio',
        });

        expect(async () => await recordingService.createRecording(user.musician.id, createArgs)).rejects.toThrow(
          new CustomException(VALIDATE_SERVICE_ERROR_CODE.LICENSE_ID_DUPLICATED)
        );
      });
    });

    it('Update Recording', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);

        const recording = await prisma.recording.findFirst({
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

        const region = await prisma.regionLargeGroup.findFirst({
          include: {
            regions: true,
          },
          orderBy: {
            name: 'desc',
          },
        });

        const updateArgs = new UpdateRecordingDTO({
          name: 'Recording Update',
          description: 'Recording Test Description Update',

          region: {
            regionLargeGroupId: region.id,
            ...(region.regions[0] && { regionSmallGroupId: region.regions[0].id }),
          },
        });
        await recordingService.updateRecording(recording.id, recording.musicianService.musician.id, updateArgs);

        const recordingDetail = await recordingService.findRecording(recording.id);

        expect(recordingDetail).toBeDefined();

        expect(recordingDetail.name).toBe('Recording Update');
        expect(recordingDetail.description).toBe('Recording Test Description Update');
        expect(recordingDetail.region.regionLargeGroupId).toBe(region.id);
      });
    });
  });
});
