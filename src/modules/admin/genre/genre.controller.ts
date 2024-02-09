import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { CreateGenreDTO, UpdateGenreDTO } from '@/modules/genre/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminGenreDTO } from './dto';
import { AdminGenreService } from './genre.service';

@ApiTags('[관리자] 장르')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('genres')
export class AdminGenreController {
  constructor(private readonly genreService: AdminGenreService) {}

  @Get(':genreId/detail')
  @ApiOperation({ summary: '장르 조회 상세 조회 API', description: '장르 상세 조회 API' })
  @ResponseApi({
    type: AdminGenreDTO,
  })
  async findGenre(@Param('genreId') genreId: string) {
    return await this.genreService.findGenre(genreId);
  }

  @Get()
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '장르 목록 조회 API', description: '장르 목록 조회 API' })
  @ResponseApi({
    type: AdminGenreDTO,
    isPaging: true,
  })
  async findGenres(@Paging() paging: PagingDTO) {
    return await this.genreService.findGenres(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '장르 생성 API', description: '장르 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createGenre(@Body() body: CreateGenreDTO) {
    return await this.genreService.createGenre(body);
  }

  @Patch(':genreId')
  @ApiOperation({ summary: '장르 수정 API', description: '장르 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateGenre(@Param('genreId') genreId: string, @Body() body: UpdateGenreDTO) {
    return await this.genreService.updateGenre(genreId, body);
  }

  @Delete(':genreId')
  @ApiOperation({ summary: '장르 삭제 API', description: '장르 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteGenre(@Param('genreId') genreId: string) {
    return await this.genreService.deleteGenre(genreId);
  }
}
