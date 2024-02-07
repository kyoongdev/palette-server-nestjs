import { Body, Controller, Delete, Get, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
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

import { CreateMixMasteringDTO, MixMasteringDTO, MixMasteringListDTO, UpdateMixMasteringDTO } from './dto';
import { FindMixMasteringQuery } from './dto/query';
import { MixMasteringService } from './mix-mastering.service';

@ApiTags('믹스 마스터링')
@Controller('mix-masterings')
export class MixMasteringController {
  constructor(private readonly mixMasteringService: MixMasteringService) {}

  @Get()
  @ApiOperation({ summary: '믹스 마스터링 목록 조회 API', description: '믹스 마스터링 목록을 조회합니다.' })
  @ResponseApi({
    type: MixMasteringListDTO,
    isPaging: true,
  })
  async findMixMasteringList(@Paging() paging: PagingDTO, @Query() query: FindMixMasteringQuery) {
    return await this.mixMasteringService.findMixMasteringsWithSQL(paging, query);
  }

  @Get(':mixMasteringId/detail')
  @ApiOperation({ summary: '믹스 마스터링 상세 조회 API', description: '믹스 마스터링 상세 정보를 조회합니다.' })
  @ResponseApi({
    type: MixMasteringDTO,
  })
  async findMixMasteringDetail(@Query('mixMasteringId') mixMasteringId: string) {
    return await this.mixMasteringService.findMixMastering(mixMasteringId);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '믹스 마스터링 등록 API (뮤지션만 사용 가능)', description: '믹스 마스터링을 등록합니다.' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createMixMastering(@ReqUser() user: RequestMusician, @Body() data: CreateMixMasteringDTO) {
    return await this.mixMasteringService.createMixMastering(user.musician.id, data);
  }

  @Patch(':mixMasteringId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '믹스 마스터링 수정 API (뮤지션만 사용 가능)', description: '믹스 마스터링을 수정합니다.' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMixMastering(
    @ReqUser() user: RequestMusician,
    @Query('mixMasteringId') mixMasteringId: string,
    @Body() data: UpdateMixMasteringDTO
  ) {
    await this.mixMasteringService.updateMixMastering(user.musician.id, mixMasteringId, data);
  }

  @Delete(':mixMasteringId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '믹스 마스터링 삭제 API (뮤지션만 사용 가능)', description: '믹스 마스터링을 삭제합니다.' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMixMastering(@ReqUser() user: RequestMusician, @Query('mixMasteringId') mixMasteringId: string) {
    await this.mixMasteringService.deleteMixMastering(user.musician.id, mixMasteringId);
  }
}
