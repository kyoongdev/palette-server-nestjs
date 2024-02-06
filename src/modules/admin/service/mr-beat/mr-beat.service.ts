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
  constructor(private readonly mrBeatRepository: MrBeatRepository) {}

  async findMrBeatByServiceId(serviceId: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeatByServiceId(serviceId);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  @Transactional()
  async updateMrBeat(id: string, data: UpdateMrBeatDTO) {
    await this.mrBeatRepository.findMrBeat(id);

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
