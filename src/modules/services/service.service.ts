import { Injectable } from '@nestjs/common';

import { FindServiceWithDetailList } from '@/interface/service.interface';
import { serviceWithDetailInclude } from '@/utils/constants/include/service';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { MusicianServiceListDTO } from './dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findSaleServices(musicianId: string, paging: PagingDTO) {
    const count = await this.serviceRepository.countService({
      where: {
        musicianId,
        OR: [
          {
            artist: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            mrBeat: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            recording: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            mixMastering: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            albumArt: {
              isAuthorized: true,
              isPending: false,
            },
          },
        ],
      },
    });

    const services = await this.serviceRepository.findServices<FindServiceWithDetailList>({
      where: {
        musicianId,
        OR: [
          {
            artist: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            mrBeat: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            recording: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            mixMastering: {
              isAuthorized: true,
              isPending: false,
            },
          },
          {
            albumArt: {
              isAuthorized: true,
              isPending: false,
            },
          },
        ],
      },
      include: serviceWithDetailInclude,
    });

    return new PaginationDTO(services.map(MusicianServiceListDTO.fromFindServiceWithDetailList), { paging, count });
  }
}
