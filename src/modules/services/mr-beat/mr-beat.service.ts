import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { MrBeatSQL } from '@/sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateMrBeatDTO, MrBeatDTO, UpdateMrBeatDTO } from './dto';
import { MrBeatListDTO } from './dto/mr-beat-list.dto';
import { FindMrBeatsQuery } from './dto/query/find-mr-beats.query';
import { MR_BEAT_ERROR_CODE } from './exception/error-code';
import { MrBeatRepository } from './mr-beat.repository';

@Injectable()
export class MrBeatService {
  constructor(
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly fileRepository: FileRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly contactRepository: ContactRepository,
    private readonly moodRepository: MoodRepository,
    private readonly genreRepository: GenreRepository
  ) {}

  async findMrBeat(id: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeat(id);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  async findMrBeatsWithSQL(paging: PagingDTO, query?: FindMrBeatsQuery) {
    const sql = new MrBeatSQL({
      paging: paging.getSqlPaging(),
      query,
    });

    const { data, count } = await this.mrBeatRepository.findMrBeatsWithSQL(sql.getSqlQuery());

    return new PaginationDTO<MrBeatListDTO>(data.map(MrBeatListDTO.fromFindSQLMrBeatList), { count, paging });
  }

  @Transactional()
  async createMrBeat(musicianId: string, data: CreateMrBeatDTO) {
    const licensesIds = (
      await Promise.all(data.licenses.map((license) => this.licenseRepository.findLicense(license.licenseId)))
    ).map((license) => license.id);

    if (licensesIds.length !== new Set(licensesIds).size) {
      throw new CustomException(MR_BEAT_ERROR_CODE.LICENSE_DUPLICATED);
    }

    const contactIds = (
      await Promise.all(data.contacts.map((contact) => this.contactRepository.findContact(contact.contactId)))
    ).map((contact) => contact.id);

    if (contactIds.length !== new Set(contactIds).size) {
      throw new CustomException(MR_BEAT_ERROR_CODE.CONTACT_DUPLICATED);
    }

    await this.fileRepository.findImage(data.thumbnailId);
    await this.genreRepository.findGenre(data.genreId);
    await this.moodRepository.findMood(data.moodId);

    const newMrBeat = await this.mrBeatRepository.createMrBeat(data.toCreateArgs(musicianId));

    return newMrBeat.id;
  }

  @Transactional()
  async updateMrBeat(id: string, musicianId: string, data: UpdateMrBeatDTO) {
    const mrBeat = await this.findMrBeat(id);

    if (!mrBeat.isAuthorized && !mrBeat.isPending) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }

    if (mrBeat.musician.id !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (data.thumbnailId) {
      await this.fileRepository.findImage(data.thumbnailId);
    }

    if (data.genreId) {
      await this.genreRepository.findGenre(data.genreId);
    }

    if (data.moodId) {
      await this.moodRepository.findMood(data.moodId);
    }

    if (data.licenses) {
      const licensesIds = (
        await Promise.all(data.licenses.map((license) => this.licenseRepository.findLicense(license.licenseId)))
      ).map((license) => license.id);

      if (licensesIds.length !== new Set(licensesIds).size) {
        throw new CustomException(MR_BEAT_ERROR_CODE.LICENSE_DUPLICATED);
      }
    }

    if (data.contacts) {
      const contactIds = (
        await Promise.all(data.contacts.map((contact) => this.contactRepository.findContact(contact.contactId)))
      ).map((contact) => contact.id);

      if (contactIds.length !== new Set(contactIds).size) {
        throw new CustomException(MR_BEAT_ERROR_CODE.CONTACT_DUPLICATED);
      }
    }

    await this.mrBeatRepository.updateMrBeat(id, {
      ...data.toUpdateArgs(),
      isAuthorized: false,
      isPending: true,
    });
  }

  @Transactional()
  async deleteMrBeat(id: string, musicianId: string) {
    const mrBeat = await this.findMrBeat(id);

    if (mrBeat.musician.id !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }
  }
}
