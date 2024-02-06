import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { ArtistDTO, UpdateArtistDTO } from '@/modules/services/artist/dto';
import { ARTIST_ERROR_CODE } from '@/modules/services/artist/exception/error-code';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly fileRepository: FileRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly saleTypeRepository: SaleTypeRepository
  ) {}

  async findArtistByServiceId(serviceId: string) {
    const artist = await this.artistRepository.findArtistByServiceId(serviceId);

    return ArtistDTO.fromArtist(artist);
  }

  @Transactional()
  async updateArtist(id: string, data: UpdateArtistDTO) {
    await this.artistRepository.findArtist(id);

    await this.artistRepository.updateArtist(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteArtist(id: string) {
    await this.artistRepository.findArtist(id);

    await this.artistRepository.deleteArtist(id);
  }
}
