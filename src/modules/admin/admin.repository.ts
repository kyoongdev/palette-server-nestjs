import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';

import { AdminDTO } from './dto';

@Injectable()
export class AdminRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findAdmins(args = {} as Prisma.AdminFindManyArgs) {
    const admins = await this.database.getRepository().admin.findMany(args);

    return admins.map((admin) => new AdminDTO(admin));
  }

  async countAdmins(args = {} as Prisma.AdminCountArgs) {
    return await this.database.getRepository().admin.count(args);
  }
}
