import { Module } from '@nestjs/common';

import { PrismaDatabase } from './prisma.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaDatabase],
  exports: [PrismaService, PrismaDatabase],
})
export class PrismaModule {}
