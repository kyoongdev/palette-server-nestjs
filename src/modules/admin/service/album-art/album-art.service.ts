import { Injectable } from '@nestjs/common';

import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { AlbumArtDTO, UpdateAlbumArtDTO } from '@/modules/services/album-art/dto';
import { ValidateServiceProvider } from '@/modules/services/validation/validate-service.provider';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminAlbumArtService {
  constructor(
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findAlbumArtByServiceId(serviceId: string) {
    const albumArt = await this.albumArtRepository.findAlbumArtByServiceId(serviceId);

    return AlbumArtDTO.fromFindAlbumArt(albumArt);
  }

  @Transactional()
  async updateAlbumArt(id: string, data: UpdateAlbumArtDTO) {
    await this.albumArtRepository.findAlbumArt(id);
    await this.validateService.validateAlbumArt(data);
    await this.albumArtRepository.updateAlbumArt(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteAlbumArt(id: string) {
    await this.albumArtRepository.findAlbumArt(id);
    await this.albumArtRepository.deleteAlbumArt(id);
  }
}
