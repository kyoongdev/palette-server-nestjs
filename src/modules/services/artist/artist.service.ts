import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { ArtistSQL } from '@/sql/artist/artist.sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ArtistRepository } from './artist.repository';
import { ArtistDTO, CreateArtistDTO, UpdateArtistDTO } from './dto';
import { ArtistListDTO } from './dto/artist-list.dto';
import { FindArtistListQuery } from './dto/query';
import { ARTIST_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly fileRepository: FileRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly saleTypeRepository: SaleTypeRepository
  ) {}

  async findArtist(id: string) {
    const artist = await this.artistRepository.findArtist(id);

    return ArtistDTO.fromArtist(artist);
  }

  async findArtistsWithSQL(paging: PagingDTO, query: FindArtistListQuery) {
    const sqlPaging = paging.getSqlPaging();
    const { data, count } = await this.artistRepository.findArtistsWithSQL(
      new ArtistSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO(data.map(ArtistListDTO.fromFindSQLArtistList), { count, paging });
  }
  @Transactional()
  async createArtist(musicianId: string, data: CreateArtistDTO) {
    const isThumbnailExist = data.images.some((image) => image.isThumbnail);

    if (!isThumbnailExist) throw new CustomException(ARTIST_ERROR_CODE.NO_THUMBNAIL);

    const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;

    if (thumbnailCount > 1) throw new CustomException(ARTIST_ERROR_CODE.ONLY_ONE_THUMBNAIL);

    const imageIds = (await Promise.all(data.images.map((image) => this.fileRepository.findImage(image.imageId)))).map(
      (image) => image.id
    );
    const contactIds = (
      await Promise.all(data.contacts.map((contact) => this.contactRepository.findContact(contact.contactId)))
    ).map((contact) => contact.id);

    const licenseIds = (
      await Promise.all(data.licenses.map((license) => this.licenseRepository.findLicense(license.licenseId)))
    ).map((license) => license.id);

    const saleTypeIds = (
      await Promise.all(data.saleTypeIds.map((saleTypeId) => this.saleTypeRepository.findArtistSaleType(saleTypeId)))
    ).map((saleType) => saleType.id);

    const isImageIdDuplicated = imageIds.length !== new Set(imageIds).size;
    const isContactIdDuplicated = contactIds.length !== new Set(contactIds).size;
    const isLicenseIdDuplicated = licenseIds.length !== new Set(licenseIds).size;
    const isSaleIdDuplicated = saleTypeIds.length !== new Set(saleTypeIds).size;

    if (isImageIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.IMAGE_ID_DUPLICATED);
    if (isContactIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.CONTACT_ID_DUPLICATED);
    if (isLicenseIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.LICENSE_ID_DUPLICATED);
    if (isSaleIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.SALE_ID_DUPLICATED);

    const artist = await this.artistRepository.createArtist(data.toCreateArgs(musicianId));

    return artist.id;
  }

  @Transactional()
  async updateArtist(id: string, musicianId: string, data: UpdateArtistDTO) {
    const artist = await this.findArtist(id);

    if (artist.musician.id !== musicianId) {
      throw new CustomException(ARTIST_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (data.images) {
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

    if (data.saleTypeIds) {
      const saleTypeIds = (
        await Promise.all(data.saleTypeIds.map((saleTypeId) => this.saleTypeRepository.findArtistSaleType(saleTypeId)))
      ).map((saleType) => saleType.id);

      const isSaleIdDuplicated = saleTypeIds.length !== new Set(saleTypeIds).size;

      if (isSaleIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.SALE_ID_DUPLICATED);
    }

    await this.artistRepository.updateArtist(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteArtist(id: string, musicianId: string) {
    const artist = await this.findArtist(id);

    if (artist.musician.id !== musicianId) {
      throw new CustomException(ARTIST_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.artistRepository.deleteArtist(id);
  }
}
