import { Injectable } from '@nestjs/common';

import { RecordingDTO, UpdateRecordingDTO } from '@/modules/services/recording/dto';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';
import { ValidateServiceProvider } from '@/modules/services/validation/validate-service.provider';
import { Transactional } from '@/utils/aop/transaction/transaction';

@Injectable()
export class AdminRecordingService {
  constructor(
    private readonly recordingRepository: RecordingRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findRecordingByServiceId(serviceId: string) {
    const recording = await this.recordingRepository.findRecordingByServiceId(serviceId);

    return RecordingDTO.fromFindRecording(recording);
  }

  @Transactional()
  async updateRecording(id: string, data: UpdateRecordingDTO) {
    await this.recordingRepository.findRecording(id);
    await this.validateService.validateRecording(data);
    await this.recordingRepository.updateRecording(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteRecording(id: string) {
    await this.recordingRepository.findRecording(id);
    await this.recordingRepository.deleteRecording(id);
  }
}
