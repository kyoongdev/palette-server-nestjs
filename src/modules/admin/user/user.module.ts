import { Module } from '@nestjs/common';

import { UserRepository } from '@/modules/user/user.repository';

import { AdminUserController } from './user.controller';
import { AdminUserService } from './user.service';

@Module({
  providers: [AdminUserService, UserRepository],
  controllers: [AdminUserController],
})
export class AdminUserModule {}
