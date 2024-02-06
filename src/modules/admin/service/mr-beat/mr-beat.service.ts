import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { MrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { MR_BEAT_ERROR_CODE } from '@/modules/services/mr-beat/exception/error-code';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminMrBeatService {
  constructor(
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly fileRepository: FileRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly contactRepository: ContactRepository,
    private readonly moodRepository: MoodRepository,
    private readonly genreRepository: GenreRepository
  ) {}

  async findMrBeatByServiceId(serviceId: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeatByServiceId(serviceId);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  @Transactional()
  async updateMrBeat(id: string, data: UpdateMrBeatDTO) {
    await this.mrBeatRepository.findMrBeat(id);

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
      isAuthorized: true,
      isPending: false,
    });
  }

  @Transactional()
  async deleteMrBeat(id: string) {
    await this.mrBeatRepository.findMrBeat(id);

    await this.mrBeatRepository.deleteMrBeat(id);
  }
}
