import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { inquiryInclude } from '@/utils/constants/include/inquiry';

import { INQUIRY_ERROR_CODE } from './exception/error-code';

@Injectable()
export class InquiryRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findInquiry(id: string) {
    const inquiry = await this.database.getRepository().inquiry.findUnique({
      where: {
        id,
      },
      include: inquiryInclude,
    });

    if (!inquiry) {
      throw new CustomException(INQUIRY_ERROR_CODE.INQUIRY_NOT_FOUND);
    }

    return inquiry;
  }

  async findInquiries(args = {} as Prisma.InquiryFindManyArgs) {
    const { where, include, select, ...rest } = args;
    const inquiries = await this.database.getRepository().inquiry.findMany({
      where,
      include: inquiryInclude,
      ...rest,
    });

    return inquiries;
  }

  async countInquiries(args = {} as Prisma.InquiryCountArgs) {
    const count = await this.database.getRepository().inquiry.count(args);

    return count;
  }

  async createInquiry(data: Prisma.InquiryCreateInput) {
    const inquiry = await this.database.getRepository().inquiry.create({
      data,
    });

    return inquiry;
  }

  async updateInquiry(id: string, data: Prisma.InquiryUpdateInput) {
    await this.database.getRepository().inquiry.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteInquiry(id: string) {
    await this.database.getRepository().inquiry.delete({
      where: {
        id,
      },
    });
  }
}
