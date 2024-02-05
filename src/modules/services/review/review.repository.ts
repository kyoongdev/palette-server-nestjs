import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { reviewInclude } from '@/utils/constants/include/review';

import { REVIEW_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ReviewRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findReview(id: string) {
    const review = await this.database.getRepository().serviceReview.findUnique({
      where: {
        id,
      },
      include: reviewInclude,
    });

    if (!review) {
      throw new CustomException(REVIEW_ERROR_CODE.REVIEW_NOT_FOUND);
    }

    return review;
  }

  async findFirstReview(where = {} as Prisma.ServiceReviewWhereInput) {
    const review = await this.database.getRepository().serviceReview.findFirst({
      where,
      include: reviewInclude,
    });

    if (!review) {
      throw new CustomException(REVIEW_ERROR_CODE.REVIEW_NOT_FOUND);
    }

    return review;
  }

  async findReviewReply(id: string) {
    const reviewReply = await this.database.getRepository().serviceReviewReply.findUnique({
      where: {
        id,
      },
    });

    if (!reviewReply) {
      throw new CustomException(REVIEW_ERROR_CODE.REVIEW_REPLY_NOT_FOUND);
    }

    return reviewReply;
  }

  async checkReviewExists(where = {} as Prisma.ServiceReviewWhereInput) {
    const review = await this.database.getRepository().serviceReview.findFirst({
      where,
    });

    return review ?? null;
  }

  async checkReviewReplyExists(where = {} as Prisma.ServiceReviewReplyWhereInput) {
    const reviewReply = await this.database.getRepository().serviceReviewReply.findFirst({
      where,
    });

    return reviewReply ?? null;
  }

  async findReviews(args = {} as Prisma.ServiceReviewFindManyArgs) {
    const { where, include, select, ...rest } = args;

    const reviews = await this.database.getRepository().serviceReview.findMany({
      where,
      include: reviewInclude,
      ...rest,
    });

    return reviews;
  }

  async countReviews(args = {} as Prisma.ServiceReviewCountArgs) {
    return await this.database.getRepository().serviceReview.count(args);
  }

  async createReview(data: Prisma.ServiceReviewCreateInput) {
    return await this.database.getRepository().serviceReview.create({
      data,
    });
  }

  async createReviewReply(data: Prisma.ServiceReviewReplyCreateInput) {
    return await this.database.getRepository().serviceReviewReply.create({
      data,
    });
  }

  async updateReview(id: string, data: Prisma.ServiceReviewUpdateInput) {
    await this.database.getRepository().serviceReview.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateReviewReply(id: string, data: Prisma.ServiceReviewReplyUpdateInput) {
    await this.database.getRepository().serviceReviewReply.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteReviewReply(id: string) {
    await this.database.getRepository().serviceReviewReply.delete({
      where: {
        id,
      },
    });
  }

  async deleteReview(id: string) {
    await this.database.getRepository().serviceReview.delete({
      where: {
        id,
      },
    });
  }
}
