import { Body, Controller, Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { RequestMusician, RequestUser } from '@/interface/token.interface';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { Auth, ResponseApi } from '@/utils/swagger';

import { CommonMusicianDTO, CreateMusicianDTO } from './dto';
import { UpdateMusicianDTO } from './dto/update-musician.dto';
import { MusicianService } from './musician.service';

@ApiTags('[뮤지션]')
@Controller()
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  @Get('/me')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ description: '내 뮤지션 정보 조회', summary: '내 뮤지션 정보 조회 API' })
  @ResponseApi({
    type: CommonMusicianDTO,
  })
  async findMyMusician(@ReqUser() user: RequestMusician) {
    return await this.musicianService.findMusicianByUserId(user.id);
  }

  @Post('/me')
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ description: '뮤지션 등록', summary: '뮤지션 등록 API' })
  @ApiBody({ type: CreateMusicianDTO })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createMusician(@ReqUser() user: RequestUser, @Body() body: CreateMusicianDTO) {
    return await this.musicianService.createMusician(user.id, body);
  }

  @Patch('/me')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ description: '뮤지션 수정', summary: '뮤지션 수정 API' })
  @ApiBody({ type: UpdateMusicianDTO })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMusician(@ReqUser() user: RequestUser, @Body() body: UpdateMusicianDTO) {
    return await this.musicianService.updateMusician(user.id, body);
  }

  @Delete('/me')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ description: '뮤지션 삭제', summary: '뮤지션 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMusician(@ReqUser() user: RequestUser) {
    return await this.musicianService.deleteMusician(user.id);
  }
}
