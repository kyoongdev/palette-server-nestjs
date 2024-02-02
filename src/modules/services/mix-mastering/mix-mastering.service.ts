import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MixMasteringSQL } from '@/sql/mix-mastering';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateMixMasteringDTO, MixMasteringDTO, MixMasteringListDTO, UpdateMixMasteringDTO } from './dto';
import { FindMixMasteringQuery } from './dto/query';
import { MIX_MASTERING_ERROR_CODE } from './exception/error-code';
import { MixMasteringRepository } from './mix-mastering.repository';

@Injectable()
export class MixMasteringService {
  constructor(
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly fileRepository: FileRepository,
    private readonly genreRepository: GenreRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository
  ) {}

  async findMixMastering(id: string) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    return MixMasteringDTO.fromFindMixMastering(mixMastering);
  }

  async findSQLMixMasterings(paging: PagingDTO, query: FindMixMasteringQuery) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.mixMasteringRepository.findSQLMixMasterings(
      new MixMasteringSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO<MixMasteringListDTO>(data.map(MixMasteringListDTO.fromFindSQLMixMastering), {
      count,
      paging,
    });
  }

  @Transactional()
  async createMixMastering(musicianId: string, data: CreateMixMasteringDTO) {
    if (data.musics.length !== 2) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_COUNT);
    }
    const beforeMusic = data.musics.filter((music) => music.isBefore);
    const afterMusic = data.musics.filter((music) => !music.isBefore);

    if (beforeMusic.length !== 1 || afterMusic.length !== 1) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_BEFORE_AFTER_COUNT);
    }

    const musicIds = await Promise.all(
      data.musics.map(async (music) => {
        const isExists = await this.fileRepository.findMusic(music.musicId);

        return isExists.id;
      })
    );

    const isMusicDuplicated = musicIds.length !== new Set(musicIds).size;

    if (isMusicDuplicated) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_ID_DUPLICATE);
    }

    await this.genreRepository.findGenre(data.genreId);
    const contactIds = await Promise.all(
      data.contacts.map(async (contact) => {
        const isExists = await this.contactRepository.findContact(contact.contactId);

        return isExists.id;
      })
    );

    const isContactDuplicated = contactIds.length !== new Set(contactIds).size;

    if (isContactDuplicated) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.CONTACT_ID_DUPLICATED);
    }

    const licenseIds = await Promise.all(
      data.licenses.map(async (license) => {
        const isExists = await this.licenseRepository.findLicense(license.licenseId);

        return isExists.id;
      })
    );

    const isLicenseDuplicated = licenseIds.length !== new Set(licenseIds).size;

    if (isLicenseDuplicated) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.LICENSE_ID_DUPLICATED);
    }
    await this.fileRepository.findImage(data.thumbnailId);

    const mixMastering = await this.mixMasteringRepository.createMixMastering(data.toCreateArgs(musicianId));

    return mixMastering.id;
  }

  @Transactional()
  async updateMixMastering(id: string, musicianId: string, data: UpdateMixMasteringDTO) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    if (mixMastering.musicianService.musician.id !== musicianId) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (data.musics) {
      if (data.musics.length !== 2) {
        throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_COUNT);
      }
      const beforeMusic = data.musics.filter((music) => music.isBefore);
      const afterMusic = data.musics.filter((music) => !music.isBefore);

      if (beforeMusic.length !== 1 || afterMusic.length !== 1) {
        throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_BEFORE_AFTER_COUNT);
      }

      const musicIds = await Promise.all(
        data.musics.map(async (music) => {
          const isExists = await this.fileRepository.findMusic(music.musicId);

          return isExists.id;
        })
      );

      const isMusicDuplicated = musicIds.length !== new Set(musicIds).size;

      if (isMusicDuplicated) {
        throw new CustomException(MIX_MASTERING_ERROR_CODE.MUSIC_ID_DUPLICATE);
      }
    }

    if (data.contacts) {
      const contactIds = await Promise.all(
        data.contacts.map(async (contact) => {
          const isExists = await this.contactRepository.findContact(contact.contactId);

          return isExists.id;
        })
      );

      const isContactDuplicated = contactIds.length !== new Set(contactIds).size;

      if (isContactDuplicated) {
        throw new CustomException(MIX_MASTERING_ERROR_CODE.CONTACT_ID_DUPLICATED);
      }
    }

    if (data.licenses) {
      const licenseIds = await Promise.all(
        data.licenses.map(async (license) => {
          const isExists = await this.licenseRepository.findLicense(license.licenseId);

          return isExists.id;
        })
      );

      const isLicenseDuplicated = licenseIds.length !== new Set(licenseIds).size;

      if (isLicenseDuplicated) {
        throw new CustomException(MIX_MASTERING_ERROR_CODE.LICENSE_ID_DUPLICATED);
      }
    }

    if (data.thumbnailId) {
      await this.fileRepository.findImage(data.thumbnailId);
    }

    if (data.genreId) {
      await this.genreRepository.findGenre(data.genreId);
    }

    await this.mixMasteringRepository.updateMixMastering(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteMixMastering(id: string, musicianId: string) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    if (mixMastering.musicianService.musician.id !== musicianId) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.mixMasteringRepository.deleteMixMastering(id);
  }
}
