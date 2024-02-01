import { Injectable } from '@nestjs/common';

import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';

@Injectable()
export class AdminServiceService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly recordingRepository: RecordingRepository
  ) {}
  async approveService() {}

  async rejectService() {}
}
