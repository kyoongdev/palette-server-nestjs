import { Global, Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { AlsModule } from './als.module';

@Global()
@Module({
  imports: [PrismaModule, AlsModule],
  exports: [PrismaModule, AlsModule],
})
export class GlobalModule {}
