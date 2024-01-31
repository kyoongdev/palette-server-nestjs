import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { RequestMusician } from '@/interface/token.interface';
import { ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { ArtistService } from './artist.service';
import { ArtistDTO, CreateArtistDTO } from './dto';
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
  @ApiOperation({ summary: '아티스트 생성 API', description: '아티스트를 생성합니다.' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createArtist(@ReqUser() user: RequestMusician, @Body() body: CreateArtistDTO) {
    return await this.artistService.createArtist(user.musician.id, body);
  }
}
