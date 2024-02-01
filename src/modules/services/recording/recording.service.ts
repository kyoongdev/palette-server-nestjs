import { Injectable } from '@nestjs/common';

import { RecordingRepository } from './recording.repository';

@Injectable()
export class RecordingService {
  constructor(private readonly recordingRepository: RecordingRepository) {}

  async findRecording(id: string) {
    const recording = this.recordingRepository.findRecording(id);
  }
}
