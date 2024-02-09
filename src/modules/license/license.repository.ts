import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { LICENSE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class LicenseRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findLicense(id: string) {
    const license = await this.database.getRepository().license.findUnique({
      where: {
        id,
      },
    });

    if (!license) {
      throw new CustomException(LICENSE_ERROR_CODE.LICENSE_NOT_FOUND);
    }

    return license;
  }

  async findLicenses(args = {} as Prisma.LicenseFindManyArgs) {
    const licenses = await this.database.getRepository().license.findMany(args);

    return licenses;
  }

  async countLicense(args = {} as Prisma.LicenseCountArgs) {
    const count = await this.database.getRepository().license.count(args);

    return count;
  }

  async createLicense(data: Prisma.LicenseCreateInput) {
    const license = await this.database.getRepository().license.create({
      data,
    });

    return license;
  }

  async updateLicense(id: string, data: Prisma.LicenseUpdateInput) {
    await this.database.getRepository().license.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  async deleteLicense(id: string) {
    await this.database.getRepository().license.delete({
      where: {
        id,
      },
    });
  }
}
