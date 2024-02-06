import { Injectable } from '@nestjs/common';

import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';
import { ServiceRepository } from '@/modules/services/service.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ApproveServiceDTO, RejectServiceDTO, ServiceCountDTO } from './dto';
import { FindServiceQuery } from './dto/query/find-service.query';
import { AdminServiceListDTO } from './dto/service-list.dto';

@Injectable()
export class AdminServiceService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly recordingRepository: RecordingRepository,
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly serviceRepository: ServiceRepository
  ) {}

  async findServices(paging: PagingDTO, query: FindServiceQuery) {
    const { skip, take } = paging.getSkipTake();
    const services = await this.serviceRepository.findServices({
      ...query.toFindManyArgs(),
      skip,
      take,
    });

    const count = await this.serviceRepository.countService({
      where: query.toFindManyArgs().where,
    });

    return new PaginationDTO(services.map(AdminServiceListDTO.fromFindServiceList), { paging, count });
  }

  async countServices() {
    const totalCount = await this.serviceRepository.countService();
    const artistCount = await this.serviceRepository.countService({
      where: {
        artist: {
          isAuthorized: true,
          isPending: false,
        },
      },
    });
    const mrBeatCount = await this.serviceRepository.countService({
      where: {
        mrBeat: {
          isAuthorized: true,
          isPending: false,
        },
      },
    });

    const recordingCount = await this.serviceRepository.countService({
      where: {
        recording: {
          isAuthorized: true,
          isPending: false,
        },
      },
    });

    const albumArtCount = await this.serviceRepository.countService({
      where: {
        albumArt: {
          isAuthorized: true,
          isPending: false,
        },
      },
    });

    const mixMasteringCount = await this.serviceRepository.countService({
      where: {
        mixMastering: {
          isAuthorized: true,
          isPending: false,
        },
      },
    });

    return new ServiceCountDTO({
      totalCount,
      artistCount,
      mrBeatCount,
      recordingCount,
      albumArtCount,
      mixMasteringCount,
    });
  }

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
    } else if (data.serviceType === 'ALBUM_ART') {
      await this.albumArtRepository.findAlbumArt(serviceId);
      await this.albumArtRepository.updateAlbumArt(serviceId, {
        isAuthorized: true,
        isPending: false,
      });
    } else if (data.serviceType === 'MIX_MASTERING') {
      await this.mixMasteringRepository.findMixMastering(serviceId);
      await this.mixMasteringRepository.updateMixMastering(serviceId, {
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
    if (data.serviceType === 'ALBUM_ART') {
      await this.albumArtRepository.findAlbumArt(serviceId);
      await this.albumArtRepository.updateAlbumArt(serviceId, {
        isAuthorized: false,
        isPending: false,
      });
    } else if (data.serviceType === 'MIX_MASTERING') {
      await this.mixMasteringRepository.findMixMastering(serviceId);
      await this.mixMasteringRepository.updateMixMastering(serviceId, {
        isAuthorized: false,
        isPending: false,
      });
    }
  }
}
