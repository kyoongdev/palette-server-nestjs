import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { UserService } from '@/modules/user/user.service';
import { PrismaService } from '@/database/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@/modules/user/user.repository';
import { createNamespace, getNamespace } from 'cls-hooked';
import { PALETTE_NAMESPACE, PALETTE_PRISMA_SERVICE } from '@/common/decorator/transaction.decorator';

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

const namespace = getNamespace(PALETTE_NAMESPACE) ?? createNamespace(PALETTE_NAMESPACE);

describe('UserService', () => {
  namespace.run(() => {
    let service: UserService;
    let mockPrisma: DeepMockProxy<PrismaClient>;
    const namespace2 = getNamespace(PALETTE_NAMESPACE);
    namespace2.set(PALETTE_PRISMA_SERVICE, new PrismaClient());
    console.log(typeof namespace2.get(PALETTE_PRISMA_SERVICE));

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService, PrismaService, UserRepository],
      })
        .overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

      service = module.get<UserService>(UserService);
      mockPrisma = module.get(PrismaService);
    });

    describe('Check user duplication', () => {
      it('should return a User if user exists.', async () => {
        (mockPrisma.user as any).findUnique.mockResolvedValueOnce(testUser);

        const result = await service.findUser(testUser.id);

        expect(result.id).toEqual(testUser.id);
      });
    });
  });
});
