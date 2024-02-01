import { Injectable } from '@nestjs/common';

import { RecordingRepository } from './recording.repository';

@Injectable()
export class RecordingService {
  constructor(private readonly recordingRepository: RecordingRepository) {}
}
