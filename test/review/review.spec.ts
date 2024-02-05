import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { CreateReviewDTO } from '@/modules/services/review/dto';
import { ReviewRepository } from '@/modules/services/review/review.repository';
import { ReviewService } from '@/modules/services/review/review.service';
import { UserRepository } from '@/modules/user/user.repository';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ClsModule, ClsService } from 'nestjs-cls';

describe('Review test', () => {
  let userRepository: UserRepository;
  let reviewService: ReviewService;
  let cls: ClsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewRepository, ReviewService, UserRepository, PrismaService, PrismaDatabase],
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

    reviewService = module.get<ReviewService>(ReviewService);
    userRepository = module.get<UserRepository>(UserRepository);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
  });

  describe('Review Service', () => {
    it('Create Review', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);

        const user = await userRepository.createUser({
          name: 'test',
          nickname: 'test',
        });
        const service = await prisma.musicianService.findFirst();

        const review = await reviewService.createReview(
          user.id,
          new CreateReviewDTO({
            serviceId: service.id,
            content: 'test',
            score: 4,
          })
        );

        expect(review).toBeDefined();
      });
    });
  });
});
