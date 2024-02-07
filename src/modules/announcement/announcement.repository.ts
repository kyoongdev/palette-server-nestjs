import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { ANNOUNCEMENT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AnnouncementRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findAnnouncement(id: string) {
    const announcement = await this.database.getRepository().announcement.findUnique({
      where: {
        id,
      },
    });

    if (!announcement) {
      throw new CustomException(ANNOUNCEMENT_ERROR_CODE.ANNOUNCEMENT_NOT_FOUND);
    }

    return announcement;
  }

  async findAnnouncements(args = {} as Prisma.AnnouncementFindManyArgs) {
    const announcements = await this.database.getRepository().announcement.findMany(args);

    return announcements;
  }

  async countAnnouncements(args = {} as Prisma.AnnouncementCountArgs) {
    const count = await this.database.getRepository().announcement.count(args);

    return count;
  }

  async createAnnouncement(data: Prisma.AnnouncementCreateInput) {
    const announcement = await this.database.getRepository().announcement.create({
      data,
    });

    return announcement;
  }

  async updateAnnouncement(id: string, data: Prisma.AnnouncementUpdateInput) {
    await this.database.getRepository().announcement.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAnnouncement(id: string) {
    await this.database.getRepository().announcement.delete({
      where: {
        id,
      },
    });
  }
}
