import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewService } from './review.service';

@ApiTags('리뷰')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
}
