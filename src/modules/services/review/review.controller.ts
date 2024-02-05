import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { RequestMusician, RequestUser } from '@/interface/token.interface';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { CreateReviewDTO, CreateReviewReplyDTO, ReviewDTO, UpdateReviewDTO, UpdateReviewReplyDTO } from './dto';
import { FindReviewQuery } from './dto/query';
import { ReviewService } from './review.service';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: '리뷰 목록 조회 API', description: '리뷰 목록을 조회합니다.' })
  @ResponseApi({
    type: ReviewDTO,
    isPaging: true,
  })
  async getReviews(@Paging() paging: PagingDTO, @Query() query: FindReviewQuery) {
    return await this.reviewService.findReviews(paging, query);
  }

  @Get(':reviewId')
  @ApiOperation({ summary: '리뷰 조회 API', description: '리뷰를 조회합니다.' })
  @ResponseApi({ type: ReviewDTO })
  async getReview(@Query('reviewId') reviewId: string) {
    return await this.reviewService.findReview(reviewId);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @ApiOperation({ summary: '리뷰 작성 API (유저만 사용 가능)', description: '리뷰를 작성합니다.' })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createReview(@ReqUser() user: RequestUser, @Body() body: CreateReviewDTO) {
    return await this.reviewService.createReview(user.id, body);
  }

  @Post(':reviewId/replies')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '리뷰 답글 작성 API (뮤지션만 사용 가능)', description: '리뷰에 답글을 작성합니다.' })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createReviewReply(
    @ReqUser() user: RequestMusician,
    @Param('reviewId') reviewId: string,
    @Body() body: CreateReviewReplyDTO
  ) {
    return await this.reviewService.createReviewReply(user.musician.id, reviewId, body);
  }

  @Patch(':reviewId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @ApiOperation({ summary: '리뷰 수정 API (유저만 사용 가능)', description: '리뷰를 수정합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async updateReview(@ReqUser() user: RequestUser, @Param('reviewId') reviewId: string, @Body() body: UpdateReviewDTO) {
    await this.reviewService.updateReview(reviewId, user.id, body);
  }

  @Patch('/replies/:replyId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '리뷰 답글 수정 API (뮤지션만 사용 가능)', description: '리뷰 답글을 수정합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async updateReviewReply(
    @ReqUser() user: RequestMusician,
    @Param('replyId') replyId: string,
    @Body() body: UpdateReviewReplyDTO
  ) {
    await this.reviewService.updateReviewReply(replyId, user.musician.id, body);
  }

  @Delete(':reviewId')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @ApiOperation({ summary: '리뷰 삭제 API (유저만 사용 가능)', description: '리뷰를 삭제합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteReview(@ReqUser() user: RequestUser, @Param('reviewId') reviewId: string) {
    await this.reviewService.deleteReview(reviewId, user.id);
  }

  @Delete('/replies/:replyId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '리뷰 답글 삭제 API (뮤지션만 사용 가능)', description: '리뷰 답글을 삭제합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteReviewReply(@ReqUser() user: RequestMusician, @Param('replyId') replyId: string) {
    await this.reviewService.deleteReviewReply(replyId, user.musician.id);
  }
}
