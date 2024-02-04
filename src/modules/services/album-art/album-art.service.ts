import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { AlbumArtSQL } from '@/sql/album-art/album-art.sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AlbumArtRepository } from './album-art.repository';
import { AlbumArtDTO, AlbumArtListDTO, CreateAlbumArtDTO, UpdateAlbumArtDTO } from './dto';
import { FindAlbumArtQuery } from './dto/query/find-album-art.query';
import { ALBUM_ART_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AlbumArtService {
  constructor(
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly fileRepository: FileRepository,
    private readonly saleTypeRepository: SaleTypeRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository
  ) {}

  async findAlbumArt(id: string) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    return AlbumArtDTO.fromFindAlbumArt(albumArt);
  }

  async findSQLAlbumArt(paging: PagingDTO, query: FindAlbumArtQuery) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.albumArtRepository.findAlbumArtsWithSQL(
      new AlbumArtSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO<AlbumArtListDTO>(data.map(AlbumArtListDTO.fromFindSQLAlbumArt), { paging, count });
  }

  @Transactional()
  async createAlbumArt(musicianId: string, data: CreateAlbumArtDTO) {
    const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;

    if (thumbnailCount !== 1) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_ONE_THUMBNAIL);
    }

    const imageIds = await Promise.all(
      data.images.map(async (image) => {
        const isExists = await this.fileRepository.findImage(image.imageId);
        return isExists.id;
      })
    );
    const isImageIdDuplicated = new Set(imageIds).size !== imageIds.length;

    if (isImageIdDuplicated) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.IMAGE_ID_DUPLICATED);
    }

    await this.saleTypeRepository.findAlbumArtSaleType(data.saleTypeId);

    const contactIds = await Promise.all(
      data.contacts.map(async (contact) => {
        const isExists = await this.contactRepository.findContact(contact.contactId);
        return isExists.id;
      })
    );

    const isContactIdDuplicated = new Set(contactIds).size !== contactIds.length;

    if (isContactIdDuplicated) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.CONTACT_ID_DUPLICATED);
    }

    const licenseIds = await Promise.all(
      data.licenses.map(async (license) => {
        const isExists = await this.licenseRepository.findLicense(license.licenseId);
        return isExists.id;
      })
    );

    const isLicenseIdDuplicated = new Set(licenseIds).size !== licenseIds.length;

    if (isLicenseIdDuplicated) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.LICENSE_ID_DUPLICATED);
    }

    const albumArt = await this.albumArtRepository.createAlbumArt(data.toCreateArgs(musicianId));

    return albumArt.id;
  }

  @Transactional()
  async updateAlbumArt(id: string, musicianId: string, data: UpdateAlbumArtDTO) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    if (albumArt.musicianService.musicianId !== musicianId) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (data.images) {
      const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;

      if (thumbnailCount !== 1) {
        throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_ONE_THUMBNAIL);
      }

      const imageIds = await Promise.all(
        data.images.map(async (image) => {
          const isExists = await this.fileRepository.findImage(image.imageId);
          return isExists.id;
        })
      );
      const isImageIdDuplicated = new Set(imageIds).size !== imageIds.length;

      if (isImageIdDuplicated) {
        throw new CustomException(ALBUM_ART_ERROR_CODE.IMAGE_ID_DUPLICATED);
      }
    }

    if (data.contacts) {
      const contactIds = await Promise.all(
        data.contacts.map(async (contact) => {
          const isExists = await this.contactRepository.findContact(contact.contactId);
          return isExists.id;
        })
      );

      const isContactIdDuplicated = new Set(contactIds).size !== contactIds.length;

      if (isContactIdDuplicated) {
        throw new CustomException(ALBUM_ART_ERROR_CODE.CONTACT_ID_DUPLICATED);
      }
    }

    if (data.licenses) {
      const licenseIds = await Promise.all(
        data.licenses.map(async (license) => {
          const isExists = await this.licenseRepository.findLicense(license.licenseId);
          return isExists.id;
        })
      );

      const isLicenseIdDuplicated = new Set(licenseIds).size !== licenseIds.length;

      if (isLicenseIdDuplicated) {
        throw new CustomException(ALBUM_ART_ERROR_CODE.LICENSE_ID_DUPLICATED);
      }
    }

    if (data.saleTypeId) {
      await this.saleTypeRepository.findAlbumArtSaleType(data.saleTypeId);
    }

    await this.albumArtRepository.updateAlbumArt(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteAlbumArt(id: string, musicianId: string) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    if (albumArt.musicianService.musicianId !== musicianId) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.albumArtRepository.deleteAlbumArt(id);
  }
}
