import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  findUser() {}
}
