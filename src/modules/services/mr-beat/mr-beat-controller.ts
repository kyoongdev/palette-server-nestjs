import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { RequestMusician } from '@/interface/token.interface';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { CreateMrBeatDTO, MrBeatDTO, UpdateMrBeatDTO } from './dto';
import { MrBeatListDTO } from './dto/mr-beat-list.dto';
import { FindMrBeatsQuery } from './dto/query/find-mr-beats.query';
import { MrBeatService } from './mr-beat.service';

@ApiTags('MrBeat')
@Controller('mr-beats')
export class MrBeatController {
  constructor(private readonly mrBeatService: MrBeatService) {}

  @Get(':mrBeatId/detail')
  @ApiOperation({ description: 'MrBeat 조회', summary: 'MrBeat 조회 API' })
  @ResponseApi({
    type: MrBeatDTO,
  })
  async findMrBeat(@Param('mrBeatId') mrBeatId: string) {
    return await this.mrBeatService.findMrBeat(mrBeatId);
  }

  @Get()
  @ApiOperation({ description: 'MrBeat 리스트 조회', summary: 'MrBeat 리스트 조회 API' })
  @ResponseApi({
    type: MrBeatListDTO,
    isPaging: true,
  })
  async findMrBeats(@Paging() paging: PagingDTO, @Query() query?: FindMrBeatsQuery) {
    return await this.mrBeatService.findMrBeatsWithSQL(paging, query);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ description: 'MrBeat 생성', summary: 'MrBeat 생성 API - 뮤지션만 사용 가능' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createMrBeat(@ReqUser() user: RequestMusician, @Body() body: CreateMrBeatDTO) {
    return await this.mrBeatService.createMrBeat(user.musician.id, body);
  }

  @Patch(':mrBeatId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ description: 'MrBeat 수정', summary: 'MrBeat 수정 API - 뮤지션만 사용 가능' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMrBeat(
    @ReqUser() user: RequestMusician,
    @Param('mrBeatId') mrBeatId: string,
    @Body() body: UpdateMrBeatDTO
  ) {
    return await this.mrBeatService.updateMrBeat(mrBeatId, user.musician.id, body);
  }

  @Delete(':mrBeatId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ description: 'MrBeat 삭제', summary: 'MrBeat 삭제 API - 뮤지션만 사용 가능' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMrBeat(@ReqUser() user: RequestMusician, @Param('mrBeatId') mrBeatId: string) {
    return await this.mrBeatService.deleteMrBeat(mrBeatId, user.musician.id);
  }
}
