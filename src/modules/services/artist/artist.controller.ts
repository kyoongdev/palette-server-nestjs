import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { ArtistService } from './artist.service';
import { ArtistDTO } from './dto';
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
}
