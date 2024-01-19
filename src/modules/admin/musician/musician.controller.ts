import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { UpdateMusicianDTO } from '@/modules/musician/dto/update-musician.dto';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { AdminMusicianCountDTO } from './dto/musician-count.dto';
import { AdminMusiciansDTO } from './dto/musicians.dto';
import { AdminMusicianService } from './musician.service';

@ApiTags('[관리자] 뮤지션')
@Controller('/musicians')
export class AdminMusicianController {
  constructor(private readonly musicianService: AdminMusicianService) {}

  @Get('')
  @ApiOperation({ summary: '뮤지션 목록 조회 API', description: '뮤지션 목록 조회' })
  @ApiQuery({
    type: PagingDTO,
  })
  @ResponseApi({
    type: AdminMusiciansDTO,
    isPaging: true,
  })
  async findMusicians(@Paging() paging: PagingDTO) {
    return await this.musicianService.findMusicians(paging);
  }

  @Get('count')
  @ApiOperation({ summary: '뮤지션 카운트 API', description: '뮤지션 카운트' })
  @ResponseApi({
    type: AdminMusicianCountDTO,
  })
  async getMusicianCountInfo() {
    return await this.musicianService.getMusicianCountInfo();
  }

  @Post('/:userId/approve')
  @ApiOperation({ summary: '뮤지션 승인 API', description: '뮤지션 승인' })
  @ApiParam({
    type: 'string',
    description: '유저 아이디 (뮤지션 아이디 x)',
    name: 'userId',
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async approveMusician(@Param('userId') userId: string) {
    await this.musicianService.approveMusicianByUserId(userId);
  }

  @Post('/:userId/reject')
  @ApiOperation({ summary: '뮤지션 거절 API', description: '뮤지션 거절' })
  @ApiParam({
    type: 'string',
    description: '유저 아이디 (뮤지션 아이디 x)',
    name: 'userId',
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async rejectMusician(@Param('userId') userId: string) {
    await this.musicianService.rejectMusicianByUserId(userId);
  }

  @Patch('/:userId')
  @ApiOperation({ summary: '뮤지션 정보 수정 API', description: '뮤지션 정보 수정' })
  @ApiParam({
    type: 'string',
    description: '유저 아이디 (뮤지션 아이디 x)',
    name: 'userId',
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
  async updateMusician(@Param('userId') userId: string, updateMusicianDTO: UpdateMusicianDTO) {
    await this.musicianService.updateMusicianByUserId(userId, updateMusicianDTO);
  }
}
