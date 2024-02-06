import { Injectable } from '@nestjs/common';

import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findSaleServices(musicianId: string) {
    const services = await this.serviceRepository.findServices({
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
      include: {
        reviews: true,
      },
    });

    return services;
  }
}
