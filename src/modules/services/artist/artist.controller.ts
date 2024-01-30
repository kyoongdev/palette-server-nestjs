import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { ArtistService } from './artist.service';
import { ArtistListDTO } from './dto/artist-list.dto';

@ApiTags('아티스트')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: '아티스트 목록 조회 API', description: '아티스트 목록을 조회합니다.' })
  @ApiQuery({
    type: PagingDTO,
  })
  @ResponseApi({
    type: ArtistListDTO,
    isPaging: true,
  })
  async findArtistsWithSQL(@Paging() paging: PagingDTO) {
    return await this.artistService.findArtistsWithSQL(paging);
  }
}
