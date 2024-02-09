import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { CreateMoodDTO, UpdateMoodDTO } from '@/modules/mood/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminMoodDTO } from './dto';
import { AdminMoodService } from './mood.service';

@ApiTags('[관리자] 분위기')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('moods')
export class AdminMoodController {
  constructor(private readonly moodService: AdminMoodService) {}

  @Get(':moodId')
  @ApiOperation({ summary: ' 분위기 조회 상세 조회 API', description: ' 분위기 상세 조회 API' })
  @ResponseApi({
    type: AdminMoodDTO,
  })
  async finMood(@Param('moodId') moodId: string) {
    return await this.moodService.findMood(moodId);
  }

  @Get()
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: ' 분위기 목록 조회 API', description: '분위기 목록 조회 API' })
  @ResponseApi({
    type: AdminMoodDTO,
    isPaging: true,
  })
  async findMoods(@Paging() paging: PagingDTO) {
    return await this.moodService.findMoods(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: ' 분위기 생성 API', description: ' 분위기 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createMood(@Body() body: CreateMoodDTO) {
    return await this.moodService.createMood(body);
  }

  @Patch(':moodId')
  @ApiOperation({ summary: ' 분위기 수정 API', description: ' 분위기 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMood(@Param('moodId') moodId: string, @Body() body: UpdateMoodDTO) {
    return await this.moodService.updateMood(moodId, body);
  }

  @Delete(':moodId')
  @ApiOperation({ summary: ' 분위기 삭제 API', description: ' 분위기 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMood(@Param('moodId') moodId: string) {
    return await this.moodService.deleteMood(moodId);
  }
}
