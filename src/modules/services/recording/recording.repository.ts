import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class RecordingRepository {
  constructor(private readonly database: PrismaDatabase) {}
}
