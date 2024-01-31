import { Injectable } from '@nestjs/common';

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

  async findLicenses() {
    const licenses = await this.database.getRepository().license.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return licenses;
  }
}
