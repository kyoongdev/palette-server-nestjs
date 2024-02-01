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

import { ArtistService } from './artist.service';
import { ArtistDTO, CreateArtistDTO, UpdateArtistDTO } from './dto';
import { ArtistListDTO } from './dto/artist-list.dto';
import { FindArtistListQuery } from './dto/query';

@ApiTags('아티스트')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':artistId/detail')
  @ApiOperation({ summary: '아티스트 상세 조회 API', description: '아티스트 상세 정보를 조회합니다.' })
  @ResponseApi({
    type: ArtistDTO,
  })
  async findArtist(@Param('artistId') artistId: string) {
    return await this.artistService.findArtist(artistId);
  }

  @Get()
  @ApiOperation({ summary: '아티스트 목록 조회 API', description: '아티스트 목록을 조회합니다.' })
  @ResponseApi({
    type: ArtistListDTO,
    isPaging: true,
  })
  async findArtistsWithSQL(@Paging() paging: PagingDTO, @Query() query: FindArtistListQuery) {
    return await this.artistService.findArtistsWithSQL(paging, query);
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '아티스트 생성 API (뮤지션만 사용 가능)', description: '아티스트를 생성합니다.' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createArtist(@ReqUser() user: RequestMusician, @Body() body: CreateArtistDTO) {
    return await this.artistService.createArtist(user.musician.id, body);
  }

  @Patch(':artistId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '아티스트 수정 API (뮤지션만 사용 가능)', description: '아티스트를 수정합니다.' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateArtist(
    @ReqUser() user: RequestMusician,
    @Param('artistId') artistId: string,
    @Body() body: UpdateArtistDTO
  ) {
    return await this.artistService.updateArtist(user.musician.id, artistId, body);
  }

  @Delete(':artistId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '아티스트 삭제 API (뮤지션만 사용 가능)', description: '아티스트를 삭제합니다.' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteArtist(@ReqUser() user: RequestMusician, @Param('artistId') artistId: string) {
    return await this.artistService.deleteArtist(user.musician.id, artistId);
  }
}
