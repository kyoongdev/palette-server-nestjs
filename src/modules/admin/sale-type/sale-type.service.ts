import { Injectable } from '@nestjs/common';

import { CreateSaleTypeDTO, UpdateSaleTypeDTO } from '@/modules/sale-type/dto';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminSaleTypeDTO } from './dto';

@Injectable()
export class AdminSaleTypeService {
  constructor(private readonly saleTypeRepository: SaleTypeRepository) {}

  async findArtistSaleType(id: string) {
    const saleType = await this.saleTypeRepository.findArtistSaleType(id);

    return new AdminSaleTypeDTO(saleType);
  }

  async findAlbumArtSaleType(id: string) {
    const saleType = await this.saleTypeRepository.findAlbumArtSaleType(id);

    return new AdminSaleTypeDTO(saleType);
  }

  async findArtistSaleTypes(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.saleTypeRepository.countArtistSaleTypes();
    const saleTypes = await this.saleTypeRepository.findArtistSaleTypes({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      saleTypes.map((saleType) => new AdminSaleTypeDTO(saleType)),
      { paging, count }
    );
  }

  async findAlbumArtSaleTypes(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.saleTypeRepository.countAlbumArtSaleTypes();
    const saleTypes = await this.saleTypeRepository.findAlbumArtSaleTypes({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      saleTypes.map((saleType) => new AdminSaleTypeDTO(saleType)),
      { paging, count }
    );
  }

  async createArtistSaleType(data: CreateSaleTypeDTO) {
    const saleType = await this.saleTypeRepository.createArtistSaleType(data);

    return saleType.id;
  }

  async createAlbumArtSaleType(data: CreateSaleTypeDTO) {
    const saleType = await this.saleTypeRepository.createAlbumArtSaleType(data);

    return saleType.id;
  }

  async updateArtistSaleType(id: string, data: UpdateSaleTypeDTO) {
    await this.saleTypeRepository.findArtistSaleType(id);
    await this.saleTypeRepository.updateArtistSaleType(id, data);
  }

  async updateAlbumArtSaleType(id: string, data: UpdateSaleTypeDTO) {
    await this.saleTypeRepository.findAlbumArtSaleType(id);
    await this.saleTypeRepository.updateAlbumArtSaleType(id, data);
  }

  async deleteArtistSaleType(id: string) {
    await this.saleTypeRepository.findArtistSaleType(id);
    await this.saleTypeRepository.deleteArtistSaleType(id);
  }

  async deleteAlbumArtSaleType(id: string) {
    await this.saleTypeRepository.findAlbumArtSaleType(id);
    await this.saleTypeRepository.deleteAlbumArtSaleType(id);
  }
}
