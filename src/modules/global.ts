import { Global, Module } from '@nestjs/common';

import { JwtProvider } from '@/common/jwt/jwt';
import { PrismaModule } from '@/database/prisma.module';

import { AlsModule } from './als.module';

@Global()
@Module({
  imports: [PrismaModule, AlsModule],
  providers: [JwtProvider],
  exports: [PrismaModule, AlsModule, JwtProvider],
})
export class GlobalModule {}
