import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class LicenseRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findLicenses() {
    const licenses = await this.database.getRepository().license.findMany();
    return licenses;
  }
}
