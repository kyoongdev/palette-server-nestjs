import { Module } from '@nestjs/common';

import { PrismaDatabase } from './prisma.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
