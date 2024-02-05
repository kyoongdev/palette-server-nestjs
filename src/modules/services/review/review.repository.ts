import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaDatabase) {}
}
