import { Module } from '@nestjs/common';

import { AlbumArtRepository } from '../album-art/album-art.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { MixMasteringRepository } from '../mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '../mr-beat/mr-beat.repository';
import { RecordingRepository } from '../recording/recording.repository';

import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  providers: [
    ReviewService,
    ReviewRepository,
    // AlbumArtRepository,
    // ArtistRepository,
    // MixMasteringRepository,
    // MrBeatRepository,
    // RecordingRepository,
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
