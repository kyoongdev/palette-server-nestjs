import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CreateAdminDTO, UpdateAdminDTO } from './dto';
import { ADMIN_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AdminRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findAdmin(id: string) {
    const admin = await this.database.getRepository().admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new CustomException(ADMIN_ERROR_CODE.ADMIN_NOT_FOUND);
    }

    return admin;
  }

  async checkAdminByAdminId(adminId: string) {
    const admin = await this.database.getRepository().admin.findUnique({
      where: {
        adminId,
      },
    });

    return admin ?? false;
  }

  async findAdmins(args = {} as Prisma.AdminFindManyArgs) {
    const { select, where, ...rest } = args;
    const admins = await this.database.getRepository().admin.findMany({
      where,
      ...rest,
    });

    return admins;
  }

  async countAdmins(args = {} as Prisma.AdminCountArgs) {
    return await this.database.getRepository().admin.count(args);
  }

  async createAdmin(data: CreateAdminDTO) {
    const admin = await this.database.getRepository().admin.create({
      data,
    });

    return admin;
  }

  async updateAdmin(id: string, data: UpdateAdminDTO) {
    await this.database.getRepository().admin.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAdmin(id: string) {
    await this.database.getRepository().admin.delete({
      where: {
        id,
      },
    });
  }
}
