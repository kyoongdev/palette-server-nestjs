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

    if (data.images) {
      (await Promise.all(data.images.map((image) => this.fileRepository.findImage(image.imageId)))).map(
        (image) => image.id
      );
      const isThumbnailExist = data.images.some((image) => image.isThumbnail);

      if (!isThumbnailExist) throw new CustomException(ARTIST_ERROR_CODE.NO_THUMBNAIL);

      const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;

      if (thumbnailCount > 1) throw new CustomException(ARTIST_ERROR_CODE.ONLY_ONE_THUMBNAIL);
    }
    if (data.contacts) {
      const contactIds = (
        await Promise.all(data.contacts.map((contact) => this.contactRepository.findContact(contact.contactId)))
      ).map((contact) => contact.id);

      const isContactIdDuplicated = contactIds.length !== new Set(contactIds).size;

      if (isContactIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.CONTACT_ID_DUPLICATED);
    }

    if (data.licenses) {
      const licenseIds = (
        await Promise.all(data.licenses.map((license) => this.licenseRepository.findLicense(license.licenseId)))
      ).map((license) => license.id);

      const isLicenseIdDuplicated = licenseIds.length !== new Set(licenseIds).size;

      if (isLicenseIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.LICENSE_ID_DUPLICATED);
    }

    if (data.saleTypeId) {
      await this.saleTypeRepository.findArtistSaleType(data.saleTypeId);
    }

    await this.artistRepository.updateArtist(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteArtist(id: string) {
    await this.artistRepository.findArtist(id);

    await this.artistRepository.deleteArtist(id);
  }
}
