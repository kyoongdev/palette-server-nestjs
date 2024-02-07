import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindServiceWithDetailList } from '@/interface/service.interface';
import { AlbumArtSQL } from '@/sql/album-art/album-art.sql';
import { Top5SQL } from '@/sql/home/top5.sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { serviceWithDetailInclude } from '@/utils/constants/include/service';
import { findPendingServicesWhere, findServicesWhere } from '@/utils/constants/where/service';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AlbumArtRepository } from './album-art/album-art.repository';
import { AlbumArtListDTO } from './album-art/dto';
import { ArtistRepository } from './artist/artist.repository';
import { ArtistListDTO } from './artist/dto';
import { MusicianServiceListDTO } from './dto';
import { Top5ServiceDTOProps } from './dto/top-5-service.dto';
import { Top5DTO } from './dto/top-5.dto';
import { SERVICE_ERROR_CODE } from './exception/error-code';
import { MixMasteringListDTO } from './mix-mastering/dto';
import { MixMasteringRepository } from './mix-mastering/mix-mastering.repository';
import { MrBeatListDTO } from './mr-beat/dto/mr-beat-list.dto';
import { MrBeatRepository } from './mr-beat/mr-beat.repository';
import { RecordingListDTO } from './recording/dto';
import { RecordingRepository } from './recording/recording.repository';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly recordingRepository: RecordingRepository,
    private readonly mrBeatRepository: MrBeatRepository
  ) {}

  async findTop5Services() {
    const { data: albumArts } = await this.albumArtRepository.findAlbumArtsWithSQL<Top5ServiceDTOProps>(
      new Top5SQL('ALBUM_ART').getTop5SQL()
    );
    const { data: artists } = await this.artistRepository.findArtistsWithSQL<Top5ServiceDTOProps>(
      new Top5SQL('ARTIST').getTop5SQL()
    );
    const { data: mixMasterings } = await this.mixMasteringRepository.findMixMasteringsWithSQL<Top5ServiceDTOProps>(
      new Top5SQL('MIX_MASTERING').getTop5SQL()
    );
    const { data: mrBeats } = await this.mrBeatRepository.findMrBeatsWithSQL<Top5ServiceDTOProps>(
      new Top5SQL('MR_BEAT').getTop5SQL()
    );
    const { data: recordings } = await this.recordingRepository.findRecordingsWithSQL<Top5ServiceDTOProps>(
      new Top5SQL('RECORDING').getTop5SQL()
    );

    return new Top5DTO({
      albumArts,
      artists,
      mixMasterings,
      mrBeats,
      recordings,
    });
  }

  async findSaleServices(musicianId: string, paging: PagingDTO) {
    const count = await this.serviceRepository.countService({
      where: {
        musicianId,
        ...findServicesWhere,
      },
    });

    const services = await this.serviceRepository.findServices<FindServiceWithDetailList>({
      where: {
        musicianId,
        ...findServicesWhere,
      },
      include: serviceWithDetailInclude,
    });

    return new PaginationDTO(services.map(MusicianServiceListDTO.fromFindServiceWithDetailList), { paging, count });
  }

  async findPendingServices(musicianId: string, paging: PagingDTO) {
    const count = await this.serviceRepository.countService({
      where: {
        musicianId,
        ...findPendingServicesWhere,
      },
    });

    const services = await this.serviceRepository.findServices<FindServiceWithDetailList>({
      where: {
        musicianId,
        ...findPendingServicesWhere,
      },
      include: serviceWithDetailInclude,
    });

    return new PaginationDTO(services.map(MusicianServiceListDTO.fromFindServiceWithDetailList), { paging, count });
  }

  @Transactional()
  async stopSaleService(serviceId: string, musicianId: string) {
    const service = await this.serviceRepository.findService(serviceId);

    if (service.musicianId !== musicianId) {
      throw new CustomException(SERVICE_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (service.albumArt) {
      if (!service.albumArt.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.albumArtRepository.updateAlbumArt(service.albumArt.id, { isSaleStopped: true });
    } else if (service.artist) {
      if (!service.artist.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.artistRepository.updateArtist(service.artist.id, { isSaleStopped: true });
    } else if (service.mixMastering) {
      if (!service.mixMastering.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mixMasteringRepository.updateMixMastering(service.mixMastering.id, { isSaleStopped: true });
    } else if (service.mrBeat) {
      if (!service.mrBeat.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mrBeatRepository.updateMrBeat(service.mrBeat.id, { isSaleStopped: true });
    } else if (service.recording) {
      if (!service.recording.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.recordingRepository.updateRecording(service.recording.id, { isSaleStopped: true });
    }
  }

  @Transactional()
  async startSaleService(serviceId: string, musicianId: string) {
    const service = await this.serviceRepository.findService(serviceId);

    if (service.musicianId !== musicianId) {
      throw new CustomException(SERVICE_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (service.albumArt) {
      if (!service.albumArt.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.albumArtRepository.updateAlbumArt(service.albumArt.id, { isSaleStopped: false });
    } else if (service.artist) {
      if (!service.artist.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.artistRepository.updateArtist(service.artist.id, { isSaleStopped: false });
    } else if (service.mixMastering) {
      if (!service.mixMastering.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mixMasteringRepository.updateMixMastering(service.mixMastering.id, { isSaleStopped: false });
    } else if (service.mrBeat) {
      if (!service.mrBeat.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mrBeatRepository.updateMrBeat(service.mrBeat.id, { isSaleStopped: false });
    } else if (service.recording) {
      if (!service.recording.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.recordingRepository.updateRecording(service.recording.id, { isSaleStopped: false });
    }
  }

  @Transactional()
  async deleteService(serviceId: string, musicianId: string) {
    const service = await this.serviceRepository.findService(serviceId);

    if (service.musicianId !== musicianId) {
      throw new CustomException(SERVICE_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    if (service.albumArt) {
      if (!service.albumArt.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.albumArtRepository.deleteAlbumArt(service.albumArt.id);
    } else if (service.artist) {
      if (!service.artist.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.artistRepository.deleteArtist(service.artist.id);
    } else if (service.mixMastering) {
      if (!service.mixMastering.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mixMasteringRepository.deleteMixMastering(service.mixMastering.id);
    } else if (service.mrBeat) {
      if (!service.mrBeat.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.mrBeatRepository.deleteMrBeat(service.mrBeat.id);
    } else if (service.recording) {
      if (!service.recording.isAuthorized) {
        throw new CustomException(SERVICE_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
      }

      await this.recordingRepository.deleteRecording(service.recording.id);
    }
  }

  @Transactional()
  async clickService(serviceId: string, userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const isExists = await this.serviceRepository.checkServiceClicked({
      where: {
        userId,
        musicianServiceId: serviceId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (!isExists) {
      await this.serviceRepository.updateService(serviceId, {
        clicks: {
          create: {
            createdAt: new Date(),
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
      });
    }
  }
}
