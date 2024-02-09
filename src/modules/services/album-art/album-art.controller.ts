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

import { AlbumArtService } from './album-art.service';
import { AlbumArtDTO, AlbumArtListDTO, CreateAlbumArtDTO, UpdateAlbumArtDTO } from './dto';
import { FindAlbumArtQuery } from './dto/query/find-album-art.query';

@ApiTags('앨범 아트')
@Controller('album-arts')
export class AlbumArtController {
  constructor(private readonly albumArtService: AlbumArtService) {}

  @Get()
  @ApiOperation({ summary: '앨범 아트 목록 조회 API', description: '앨범 아트 목록을 조회합니다.' })
  @ResponseApi({
    type: AlbumArtListDTO,
    isPaging: true,
  })
  async findAlbumArts(@Paging() paging: PagingDTO, @Query() query: FindAlbumArtQuery) {
    return await this.albumArtService.findSQLAlbumArt(paging, query);
  }

  @Get(':albumArtId/detail')
  @ApiOperation({ summary: '앨범 아트 상세 조회 API', description: '앨범 아트를 상세 조회합니다.' })
  @ResponseApi({ type: AlbumArtDTO })
  async findAlbumArt(@Param('albumArtId') albumArtId: string) {
    return await this.albumArtService.findAlbumArt(albumArtId);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '앨범 아트 등록 API', description: '앨범 아트를 등록합니다.' })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createAlbumArt(@ReqUser() user: RequestMusician, @Body() data: CreateAlbumArtDTO) {
    return await this.albumArtService.createAlbumArt(user.musician.id, data);
  }

  @Patch(':albumArtId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '앨범 아트 수정 API', description: '앨범 아트를 수정합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async updateAlbumArt(
    @ReqUser() user: RequestMusician,
    @Param('albumArtId') albumArtId: string,
    @Body() data: UpdateAlbumArtDTO
  ) {
    await this.albumArtService.updateAlbumArt(user.musician.id, albumArtId, data);
  }

  @Delete(':albumArtId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '앨범 아트 삭제 API', description: '앨범 아트를 삭제합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteAlbumArt(@ReqUser() user: RequestMusician, @Param('albumArtId') albumArtId: string) {
    await this.albumArtService.deleteAlbumArt(user.musician.id, albumArtId);
  }
}
