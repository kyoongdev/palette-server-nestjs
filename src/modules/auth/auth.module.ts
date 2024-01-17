import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/utils/encrypt';

import { UserRepository } from '../user/user.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserRepository, EncryptProvider],
  controllers: [AuthController],
})
export class AuthModule {}
