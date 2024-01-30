import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { AdminMusicianService } from '@/modules/admin/musician/musician.service';
import { CreateMusicianDTO } from '@/modules/musician/dto';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { MusicianService } from '@/modules/musician/musician.service';
import { UserRepository } from '@/modules/user/user.repository';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY, TransactionDecorator } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { ClsModule, ClsService } from 'nestjs-cls';

describe('Musician Test', () => {
  let adminMusicianService: AdminMusicianService;
  let musicianService: MusicianService;
  let musicianRepository: MusicianRepository;
  let cls: ClsService;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PrismaDatabase,
        MusicianRepository,
        MusicianService,
        AdminMusicianService,
        TransactionDecorator,
        UserRepository,
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

    adminMusicianService = module.get<AdminMusicianService>(AdminMusicianService);
    musicianService = module.get<MusicianService>(MusicianService);
    musicianRepository = module.get<MusicianRepository>(MusicianRepository);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
  });

  describe('승인 관련', () => {
    it('승인 대기 상태 ', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const file = await prisma.file.create({
          data: {
            extension: 'jpg',
            originalName: 'asdf',
            url: 'asdf',
          },
        });
        const createMusicianDTO: CreateMusicianDTO = new CreateMusicianDTO({
          bankAccount: '123',
          bankAccountOwnerName: 'ㅇㅂㄹㅇㅁ',
          bankCode: '123',
          evidenceFileId: file.id,
          groupType: 1,
          introduction: '~~~',
          name: 'asdf',
          stageName: 'asdfa',
        });
        const user = await prisma.user.create({
          data: {},
        });

        await musicianService.createMusician(user.id, createMusicianDTO);
        const result = await musicianService.findMusicianByUserId(user.id);

        expect(result.approveStatus).toEqual('PENDING');
      });
    });

    it('승인 거절 상태 ', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const file = await prisma.file.create({
          data: {
            extension: 'jpg',
            originalName: 'asdf',
            url: 'asdf',
          },
        });
        const createMusicianDTO: CreateMusicianDTO = new CreateMusicianDTO({
          bankAccount: '123',
          bankAccountOwnerName: 'ㅇㅂㄹㅇㅁ',
          bankCode: '123',
          evidenceFileId: file.id,
          groupType: 1,
          introduction: '~~~',
          name: 'asdf',
          stageName: 'asdfa',
        });
        const user = await prisma.user.create({
          data: {},
        });

        const musicianId = await musicianService.createMusician(user.id, createMusicianDTO);
        await adminMusicianService.rejectMusician(musicianId);

        const musician = await musicianService.findMusicianByUserId(user.id);
        expect(musician.approveStatus).toEqual('REJECTED');
      });
    });

    it('승인 완료 상태 ', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);
        const file = await prisma.file.create({
          data: {
            extension: 'jpg',
            originalName: 'asdf',
            url: 'asdf',
          },
        });
        const createMusicianDTO: CreateMusicianDTO = new CreateMusicianDTO({
          bankAccount: '123',
          bankAccountOwnerName: 'ㅇㅂㄹㅇㅁ',
          bankCode: '123',
          evidenceFileId: file.id,
          groupType: 1,
          introduction: '~~~',
          name: 'asdf',
          stageName: 'asdfa',
        });
        const user = await prisma.user.create({
          data: {},
        });

        const musicianId = await musicianService.createMusician(user.id, createMusicianDTO);

        await adminMusicianService.approveMusician(musicianId);

        const result = await musicianService.findMusicianByUserId(user.id);

        expect(result.approveStatus).toEqual('APPROVED');
      });
    });
  });
});
