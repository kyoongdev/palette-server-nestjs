import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class UserRepository extends PrismaDatabase {
  async findUser() {
    this.getRepository().user.findMany();
  }
}
