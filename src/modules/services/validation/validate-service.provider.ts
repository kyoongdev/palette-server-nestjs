import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import type {
  ValidateAlbumArt,
  ValidateArtist,
  ValidateContact,
  ValidateImageWithThumbnail,
  ValidateLicenses,
  ValidateMixMastering,
  ValidateMrBeat,
  ValidateMusic,
  ValidateRecording,
  ValidateRegion,
} from '@/interface/service.interface';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { RegionRepository } from '@/modules/region/region.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';

import { SERVICE_VALIDATION_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ValidateServiceProvider {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly saleTypeRepository: SaleTypeRepository,
    private readonly genreRepository: GenreRepository,
    private readonly moodRepository: MoodRepository,
    private readonly regionRepository: RegionRepository
  ) {}

  async validateArtist(data: ValidateArtist) {
    data.images && (await this.validateImagesWithThumbnail(data.images));
    data.contacts && (await this.validateContacts(data.contacts));
    data.licenses && (await this.validateLicenses(data.licenses));
    data.saleTypeId && (await this.saleTypeRepository.findArtistSaleType(data.saleTypeId));
  }

  async validateAlbumArt(data: ValidateAlbumArt) {
    data.images && (await this.validateImagesWithThumbnail(data.images));
    data.contacts && (await this.validateContacts(data.contacts));
    data.licenses && (await this.validateLicenses(data.licenses));
    data.saleTypeId && (await this.saleTypeRepository.findAlbumArtSaleType(data.saleTypeId));
  }

  async validateMixMastering(data: ValidateMixMastering) {
    if (data.musics) {
      if (data.musics.length !== 2) {
        throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.MUSIC_COUNT);
      }
      const beforeMusic = data.musics.filter((music) => music.isBefore);
      const afterMusic = data.musics.filter((music) => !music.isBefore);

      if (beforeMusic.length !== 1 || afterMusic.length !== 1) {
        throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.MUSIC_BEFORE_AFTER_COUNT);
      }

      await this.validateMusics(data.musics);
    }

    data.contacts && (await this.validateContacts(data.contacts));
    data.licenses && (await this.validateLicenses(data.licenses));
    data.thumbnailId && (await this.fileRepository.findImage(data.thumbnailId));
    data.genreId && (await this.genreRepository.findGenre(data.genreId));
  }

  async validateMrBeat(data: ValidateMrBeat) {
    data.thumbnailId && (await this.fileRepository.findImage(data.thumbnailId));
    data.genreId && (await this.genreRepository.findGenre(data.genreId));
    data.moodId && (await this.moodRepository.findMood(data.moodId));
    data.licenses && (await this.validateLicenses(data.licenses));
    data.contacts && (await this.validateContacts(data.contacts));
  }

  async validateRecording(data: ValidateRecording) {
    data.images && (await this.validateImagesWithThumbnail(data.images));
    data.licenses && (await this.validateLicenses(data.licenses));
    data.region && (await this.validateRegion(data.region));
  }

  async validateMusics(musics: ValidateMusic) {
    const musicIds = await Promise.all(
      musics.map(async (music) => {
        const isExists = await this.fileRepository.findMusic(music.musicId);

        return isExists.id;
      })
    );

    const isMusicDuplicated = musicIds.length !== new Set(musicIds).size;

    if (isMusicDuplicated) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.MUSIC_ID_DUPLICATE);
    }
  }

  async validateContacts(contacts: ValidateContact) {
    const contactIds = (
      await Promise.all(contacts.map((contact) => this.contactRepository.findContact(contact.contactId)))
    ).map((contact) => contact.id);

    if (contactIds.length !== new Set(contactIds).size) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.CONTACT_ID_DUPLICATED);
    }
  }

  async validateLicenses(licenses: ValidateLicenses) {
    const licenseIds = await Promise.all(
      licenses.map(async (data) => {
        const license = await this.licenseRepository.findLicense(data.licenseId);

        return license.id;
      })
    );

    const isLicenseDuplicate = licenseIds.length !== new Set(licenseIds).size;

    if (isLicenseDuplicate) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.LICENSE_ID_DUPLICATED);
    }
  }

  async validateImagesWithThumbnail(images: ValidateImageWithThumbnail) {
    const imageIds = await Promise.all(
      images.map(async (image) => {
        const file = await this.fileRepository.findImage(image.imageId);

        return file.id;
      })
    );
    const isThumbnailExist = images.some((image) => image.isThumbnail);
    const thumbnailCount = images.filter((image) => image.isThumbnail).length;
    const isImageDuplicate = imageIds.length !== new Set(imageIds).size;

    if (!isThumbnailExist) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.NO_THUMBNAIL);
    }

    if (thumbnailCount > 1) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.ONLY_ONE_THUMBNAIL);
    }

    if (isImageDuplicate) {
      throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.IMAGE_ID_DUPLICATED);
    }
  }

  async validateRegion(region: ValidateRegion) {
    const largeGroup = await this.regionRepository.findRegionLargeGroup(region.regionLargeGroupId);

    if (region.regionSmallGroupId) {
      const isSmallGroupExists = largeGroup.regions.find((smallRegion) => smallRegion.id === region.regionSmallGroupId);
      if (!isSmallGroupExists) {
        throw new CustomException(SERVICE_VALIDATION_ERROR_CODE.REGION_SMALL_GROUP_NOT_MATCH);
      }
    }
  }
}
