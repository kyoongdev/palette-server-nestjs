import { Module } from '@nestjs/common';

import { JwtProvider } from '@/common/jwt/jwt';
import { EncryptProvider } from '@/utils/encrypt';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, EncryptProvider],
  controllers: [UserController],
})
export class UserModule {}
