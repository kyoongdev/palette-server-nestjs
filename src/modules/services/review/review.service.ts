import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateReviewDTO, ReviewDTO, UpdateReviewDTO } from './dto';
import { FindReviewQuery } from './dto/query';
import { REVIEW_ERROR_CODE } from './exception/error-code';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findReview(id: string) {
    const review = await this.reviewRepository.findReview(id);

    return ReviewDTO.fromFindReview(review);
  }

  async findReviews(paging: PagingDTO, query: FindReviewQuery) {
    const { skip, take } = paging.getSkipTake();
    const reviews = await this.reviewRepository.findReviews({ where: query.toWhereArgs(), skip, take });
    const count = await this.reviewRepository.countReviews({ where: query.toWhereArgs() });

    return new PaginationDTO(reviews.map(ReviewDTO.fromFindReview), { count, paging });
  }

  @Transactional()
  async createReview(userId: string, data: CreateReviewDTO) {
    const isExists = await this.reviewRepository.checkReviewExists({
      serviceId: data.serviceId,
      userId,
    });

    if (isExists) {
      throw new CustomException(REVIEW_ERROR_CODE.REVIEW_ALREADY_EXISTS);
    }

    const review = await this.reviewRepository.createReview(data.toCreateArgs(userId));

    return review.id;
  }

  @Transactional()
  async updateReview(id: string, userId: string, data: UpdateReviewDTO) {
    const review = await this.reviewRepository.findReview(id);

    if (review.userId !== userId) {
      throw new CustomException(REVIEW_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    await this.reviewRepository.updateReview(review.id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteReview(id: string, userId: string) {
    const review = await this.reviewRepository.findReview(id);

    if (review.userId !== userId) {
      throw new CustomException(REVIEW_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.reviewRepository.deleteReview(review.id);
  }
}
