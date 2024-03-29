import { Injectable } from '@nestjs/common';

import { SaleTypeDTO } from './dto';
import { SaleTypeRepository } from './sale-type.repository';

@Injectable()
export class SaleTypeService {
  constructor(private readonly saleTypeRepository: SaleTypeRepository) {}

  async findArtistSaleTypes() {
    const saleTypes = await this.saleTypeRepository.findArtistSaleTypes({
      orderBy: {
        order: 'asc',
      },
    });

    return saleTypes.map((saleType) => new SaleTypeDTO(saleType));
  }

  async findAlbumArtSaleTypes() {
    const saleTypes = await this.saleTypeRepository.findAlbumArtSaleTypes({
      orderBy: {
        order: 'asc',
      },
    });

    return saleTypes.map((saleType) => new SaleTypeDTO(saleType));
  }
}
