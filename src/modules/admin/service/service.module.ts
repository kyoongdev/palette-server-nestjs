import { Module } from '@nestjs/common';

import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';

import { AdminServiceController } from './service.controller';
import { AdminServiceService } from './service.service';

@Module({
  providers: [AdminServiceService, ArtistRepository, MrBeatRepository, RecordingRepository],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
