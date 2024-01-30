import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { SaleTypeDTO } from './dto';
import { SaleTypeService } from './sale-type.service';

@ApiTags('판매 유형')
@Controller('sale-types')
export class SaleTypeController {
  constructor(private readonly saleTypeService: SaleTypeService) {}

  @Get('artists')
  @ApiOperation({ summary: '아티스트 판매 유형 목록 조회 API', description: '아티스트 판매 유형 목록을 조회합니다.' })
  @ResponseApi({
    type: SaleTypeDTO,
    isArray: true,
  })
  async findArtistSaleTypes() {
    return await this.saleTypeService.findArtistSaleTypes();
  }

  @Get('album-arts')
  @ApiOperation({ summary: '앨범아트 판매 유형 목록 조회 API', description: '앨범아트 판매 유형 목록을 조회합니다.' })
  @ResponseApi({
    type: SaleTypeDTO,
    isArray: true,
  })
  async findAlbumArtsSaleTypes() {
    return await this.saleTypeService.findArtistSaleTypes();
  }
}
