import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { Role } from '@/interface/token.interface';
import { CreateSaleTypeDTO, UpdateSaleTypeDTO } from '@/modules/sale-type/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminSaleTypeDTO } from './dto';
import { AdminSaleTypeService } from './sale-type.service';

@ApiTags('[관리자] 판매 유형')
@Auth([JwtAuthGuard, RoleGuard(Role.ADMIN)])
@Controller('sale-types')
export class AdminSaleTypeController {
  constructor(private readonly saleTypeService: AdminSaleTypeService) {}

  @Get('/artists/:saleTypeId/detail')
  @ApiOperation({ summary: '아티스트 판매 유형 상세 조회 API', description: '아티스트 판매 유형 상세 조회 API' })
  @ResponseApi({
    type: AdminSaleTypeDTO,
  })
  async findArtistSaleType(@Param('saleTypeId') saleTypeId: string) {
    return await this.saleTypeService.findArtistSaleType(saleTypeId);
  }

  @Get('/artists')
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '아티스트 판매 유형 목록 조회 API', description: '아티스트 판매 유형 목록 조회 API' })
  @ResponseApi({
    type: AdminSaleTypeDTO,
    isPaging: true,
  })
  async findArtistSaleTypes(@Paging() paging: PagingDTO) {
    return await this.saleTypeService.findArtistSaleTypes(paging);
  }

  @Get('/album-arts/:saleTypeId/detail')
  @ApiOperation({ summary: '앨범 아트 판매 유형 상세 조회 API', description: '앨범아트 판매 유형 상세 조회 API' })
  @ResponseApi({
    type: AdminSaleTypeDTO,
  })
  async findAlbumArtSaleType(@Param('saleTypeId') saleTypeId: string) {
    return await this.saleTypeService.findAlbumArtSaleType(saleTypeId);
  }

  @Get('/album-arts')
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '앨범아트 판매 유형 목록 조회 API', description: '앨범아트 판매 유형 목록 조회 API' })
  @ResponseApi({
    type: AdminSaleTypeDTO,
    isPaging: true,
  })
  async findAlbumArtSaleTypes(@Paging() paging: PagingDTO) {
    return await this.saleTypeService.findAlbumArtSaleTypes(paging);
  }

  @Post('/artists')
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '아티스트 판매 유형 생성 API', description: '아티스트 판매 유형 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createArtistSaleType(@Body() body: CreateSaleTypeDTO) {
    return await this.saleTypeService.createArtistSaleType(body);
  }

  @Post('/album-arts')
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '아티스트 판매 유형 생성 API', description: '아티스트 판매 유형 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAlbumArtSaleType(@Body() body: CreateSaleTypeDTO) {
    return await this.saleTypeService.createAlbumArtSaleType(body);
  }

  @Patch('/artists/:saleTypeId')
  @ApiOperation({ summary: '아티스트 판매 유형 수정 API', description: '아티스트 판매 유형 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateArtistSaleType(@Param('saleTypeId') saleTypeId: string, @Body() body: UpdateSaleTypeDTO) {
    await this.saleTypeService.updateArtistSaleType(saleTypeId, body);
  }

  @Patch('/album-arts/:saleTypeId')
  @ApiOperation({ summary: '앨범아트 판매 유형 수정 API', description: '앨범아트 판매 유형 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAlbumArtSaleType(@Param('saleTypeId') saleTypeId: string, @Body() body: UpdateSaleTypeDTO) {
    await this.saleTypeService.updateAlbumArtSaleType(saleTypeId, body);
  }

  @Delete('/artists/:saleTypeId')
  @ApiOperation({ summary: '아티스트 판매 유형 삭제 API', description: '아티스트 판매 유형 삭제 API' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteArtistSaleType(@Param('saleTypeId') saleTypeId: string) {
    return await this.saleTypeService.deleteArtistSaleType(saleTypeId);
  }

  @Delete('/album-arts/:saleTypeId')
  @ApiOperation({ summary: '앨범 아트 판매 유형 삭제 API', description: '앨범 아트 판매 유형 삭제 API' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteAlbumArtSaleType(@Param('saleTypeId') saleTypeId: string) {
    return await this.saleTypeService.deleteAlbumArtSaleType(saleTypeId);
  }
}
