import { Injectable } from '@nestjs/common';

import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';

import { ApproveServiceDTO, RejectServiceDTO } from './dto';

@Injectable()
export class AdminServiceService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly recordingRepository: RecordingRepository,
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly mixMasteringRepository: MixMasteringRepository
  ) {}

  @Transactional()
  async approveService(serviceId: string, data: ApproveServiceDTO) {
    if (data.serviceType === 'ARTIST') {
      await this.artistRepository.findArtist(serviceId);
      await this.artistRepository.updateArtist(serviceId, {
        isAuthorized: true,
        isPending: false,
      });
    } else if (data.serviceType === 'MR_BEAT') {
      await this.mrBeatRepository.findMrBeat(serviceId);
      await this.mrBeatRepository.updateMrBeat(serviceId, {
        isAuthorized: true,
        isPending: false,
      });
    } else if (data.serviceType === 'RECORDING') {
      await this.recordingRepository.findRecording(serviceId);
      await this.recordingRepository.updateRecording(serviceId, {
        isAuthorized: true,
        isPending: false,
      });
    }
  }

  @Transactional()
  async rejectService(serviceId: string, data: RejectServiceDTO) {
    if (data.serviceType === 'ARTIST') {
      await this.artistRepository.findArtist(serviceId);
      await this.artistRepository.updateArtist(serviceId, {
        isAuthorized: false,
        isPending: false,
      });
    } else if (data.serviceType === 'MR_BEAT') {
      await this.mrBeatRepository.findMrBeat(serviceId);
      await this.mrBeatRepository.updateMrBeat(serviceId, {
        isAuthorized: false,
        isPending: false,
      });
    } else if (data.serviceType === 'RECORDING') {
      await this.recordingRepository.findRecording(serviceId);
      await this.recordingRepository.updateRecording(serviceId, {
        isAuthorized: false,
        isPending: false,
      });
    }
  }
}
