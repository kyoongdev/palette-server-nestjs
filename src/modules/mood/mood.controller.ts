import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { MoodDTO } from './dto';
import { MoodService } from './mood.service';

@ApiTags('분위기')
@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Get()
  @ApiOperation({ description: '분위기 목록 조회', summary: '분위기 목록 조회 API' })
  @ResponseApi({
    type: MoodDTO,
    isArray: true,
  })
  async findMoods() {
    return await this.moodService.findMoods();
  }
}
