import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { RequestMusician } from '@/interface/token.interface';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { CreateRecordingDTO, RecordingDTO, RecordingListDTO, UpdateRecordingDTO } from './dto';
import { FindRecordingListQuery } from './dto/query';
import { RecordingService } from './recording.service';

@ApiTags('레코딩')
@Controller('recordings')
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @Get()
  @ApiOperation({ summary: '레코딩 목록 조회 API', description: '레코딩 목록 조회' })
  @ResponseApi({
    type: RecordingListDTO,
    isPaging: true,
  })
  async findRecordings(@Paging() paging: PagingDTO, @Query() query: FindRecordingListQuery) {
    return await this.recordingService.findRecordingsWithSQL(paging, query);
  }

  @Get(':recordingId/detail')
  @ApiOperation({ summary: '레코딩 상세 조회 API', description: '레코딩 상세 조회' })
  @ResponseApi({
    type: RecordingDTO,
  })
  async findRecordingDetail(@Param('recordingId') recordingId: string) {
    return await this.recordingService.findRecording(recordingId);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '레코딩 생성 API (뮤지션만 사용 가능)', description: '레코딩 생성' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createRecording(@Param('musicianId') musicianId: string, @Body() data: CreateRecordingDTO) {
    return await this.recordingService.createRecording(musicianId, data);
  }

  @Patch(':recordingId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '레코딩 수정 API (뮤지션만 사용 가능)', description: '레코딩 수정' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRecording(
    @ReqUser() user: RequestMusician,
    @Param('recordingId') recordingId: string,
    @Body() data: UpdateRecordingDTO
  ) {
    return await this.recordingService.updateRecording(recordingId, user.musician.id, data);
  }

  @Delete(':recordingId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '레코딩 삭제 API (뮤지션만 사용 가능)', description: '레코딩 수정' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRecording(@ReqUser() user: RequestMusician, @Param('recordingId') recordingId: string) {
    return await this.recordingService.deleteRecording(recordingId, user.musician.id);
  }
}
