import { Injectable } from '@nestjs/common';

import { MixMasteringDTO, UpdateMixMasteringDTO } from '@/modules/services/mix-mastering/dto';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { ValidateServiceProvider } from '@/modules/services/validation/validate-service.provider';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminMixMasteringService {
  constructor(
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findMixMasteringByServiceId(serviceId: string) {
    const mixMastering = await this.mixMasteringRepository.findMixMasteringByServiceId(serviceId);

    return MixMasteringDTO.fromFindMixMastering(mixMastering);
  }

  @Transactional()
  async updateMixMastering(id: string, data: UpdateMixMasteringDTO) {
    await this.mixMasteringRepository.findMixMastering(id);
    await this.validateService.validateMixMastering(data);
    await this.mixMasteringRepository.updateMixMastering(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteMixMastering(id: string) {
    await this.mixMasteringRepository.findMixMastering(id);
    await this.mixMasteringRepository.deleteMixMastering(id);
  }
}
