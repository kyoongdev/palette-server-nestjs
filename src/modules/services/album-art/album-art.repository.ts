import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class AlbumArtRepository {
  constructor(private readonly database: PrismaDatabase) {}
}
