import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { GenreDTO } from './dto';
import { GenreService } from './genre.service';

@ApiTags('장르')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ description: '장르 목록 조회', summary: '장르 목록 조회 API' })
  @ResponseApi({
    type: GenreDTO,
    isArray: true,
  })
  async findGenres() {
    return await this.genreService.findGenres();
  }
}
