import { Module } from '@nestjs/common';

import { JwtProvider } from '@/common/jwt/jwt';
import { EncryptProvider } from '@/utils/encrypt';

import { AdminRepository } from '../admin.repository';

import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';

@Module({
  providers: [AdminAuthService, AdminRepository, JwtProvider, EncryptProvider],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
