import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { UpdateMusicianDTO } from '@/modules/musician/dto/update-musician.dto';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminMusicianCountDTO } from './dto/musician-count.dto';
import { AdminMusiciansDTO } from './dto/musicians.dto';
import { AdminFindMusicianQuery } from './dto/query';
import { AdminMusicianService } from './musician.service';

@ApiTags('[관리자] 뮤지션')
@Controller('/musicians')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminMusicianController {
  constructor(private readonly musicianService: AdminMusicianService) {}

  @Get('')
  @ApiOperation({ summary: '뮤지션 목록 조회 API', description: '뮤지션 목록 조회' })
  @ResponseApi({
    type: AdminMusiciansDTO,
    isPaging: true,
  })
  async findMusicians(@Paging() paging: PagingDTO, @Query() query: AdminFindMusicianQuery) {
    return await this.musicianService.findMusicians(paging, query);
  }

  @Get('count')
  @ApiOperation({ summary: '뮤지션 카운트 API', description: '뮤지션 카운트' })
  @ResponseApi({
    type: AdminMusicianCountDTO,
  })
  async getMusicianCountInfo() {
    return await this.musicianService.getMusicianCountInfo();
  }

  @Post('/:musicianId/approve')
  @ApiOperation({ summary: '뮤지션 승인 API', description: '뮤지션 승인' })
  @ApiParam({
    type: 'string',
    description: '뮤지션 아이디',
    name: 'musicianId',
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async approveMusician(@Param('musicianId') musicianId: string) {
    await this.musicianService.approveMusician(musicianId);
  }

  @Post('/:musicianId/reject')
  @ApiOperation({ summary: '뮤지션 거절 API', description: '뮤지션 거절' })
  @ApiParam({
    type: 'string',
    description: '뮤지션 아이디',
    name: 'musicianId',
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async rejectMusician(@Param('musicianId') musicianId: string) {
    await this.musicianService.rejectMusician(musicianId);
  }

  @Patch('/:musicianId')
  @ApiOperation({ summary: '뮤지션 정보 수정 API', description: '뮤지션 정보 수정' })
  @ApiParam({
    type: 'string',
    description: '뮤지션 아이디',
    name: 'musicianId',
  })
  @ApiBody({
    type: UpdateMusicianDTO,
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMusician(@Param('musicianId') musicianId: string, updateMusicianDTO: UpdateMusicianDTO) {
    await this.musicianService.updateMusician(musicianId, updateMusicianDTO);
  }
}
