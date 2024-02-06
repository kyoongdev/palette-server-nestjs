import { Injectable } from '@nestjs/common';

import { MrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { ValidateServiceProvider } from '@/modules/services/validation/validate-service.provider';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminMrBeatService {
  constructor(
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findMrBeatByServiceId(serviceId: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeatByServiceId(serviceId);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  @Transactional()
  async updateMrBeat(id: string, data: UpdateMrBeatDTO) {
    await this.mrBeatRepository.findMrBeat(id);
    await this.validateService.validateMrBeat(data);
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
