import { PrismaModule } from '@/database/prisma.module';
import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';
import { EncryptProvider } from '@/utils/encrypt';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ClsModule, ClsService } from 'nestjs-cls';

const testUser: User = {
  id: '123',
  email: '9898junjun@naver.com',
  password: 'test',
  createdAt: new Date(),
  deletedAt: undefined,
  isAlarmAccepted: true,
  name: '박용준',
  nickname: '박용준',
  phoneNumber: '01040597883',
  profileImage: '~~',
  updatedAt: new Date(),
};

describe('UserService', () => {
  let service: UserService;
  let cls: ClsService;
  let mockPrisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, PrismaDatabase, UserRepository, EncryptProvider],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        ClsModule.forRoot({
          global: true,
        }),
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())

      .compile();

    service = module.get<UserService>(UserService);
    mockPrisma = module.get(PrismaService);
    cls = module.get(ClsService);
  });

  describe('Check user duplication', () => {
    it('should return a User if user exists.', async () => {
      cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, mockPrisma);
        (mockPrisma.user as any).findUnique.mockResolvedValueOnce(testUser);

        const result = await service.findCommonUser(testUser.id);

        expect(result.id).toEqual(testUser.id);
      });
    });
  });
});
