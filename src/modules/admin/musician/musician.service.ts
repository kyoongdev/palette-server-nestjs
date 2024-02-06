import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { UpdateMusicianDTO } from '@/modules/musician/dto/update-musician.dto';
import { MUSICIAN_ERROR_CODE } from '@/modules/musician/exception/error-code';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminMusicianCountDTO } from './dto/musician-count.dto';
import { AdminMusiciansDTO } from './dto/musicians.dto';
import { AdminFindMusicianQuery } from './dto/query';

@Injectable()
export class AdminMusicianService {
  constructor(private readonly musicianRepository: MusicianRepository) {}

  async findMusicians(paging: PagingDTO, query: AdminFindMusicianQuery) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.musicianRepository.countMusicians({
      where: query.toFindManyArgs().where,
    });
    const musicians = await this.musicianRepository.findMusicians({
      ...query.toFindManyArgs(),
      skip,
      take,
    });
    return new PaginationDTO(musicians.map(AdminMusiciansDTO.from), { count, paging });
  }

  async getMusicianCountInfo() {
    const total = await this.musicianRepository.countMusicians();
    const artists = await this.musicianRepository.countMusicians({
      where: {
        services: {
          some: {
            artist: {
              isNot: null,
            },
          },
        },
      },
    });
    const mrBeat = await this.musicianRepository.countMusicians({
      where: {
        services: {
          some: {
            mrBeat: {
              isNot: null,
            },
          },
        },
      },
    });

    const recording = await this.musicianRepository.countMusicians({
      where: {
        services: {
          some: {
            artist: {
              isNot: null,
            },
          },
        },
      },
    });
    const mixMastering = await this.musicianRepository.countMusicians({
      where: {
        services: {
          some: {
            artist: {
              isNot: null,
            },
          },
        },
      },
    });
    const albumArt = await this.musicianRepository.countMusicians({
      where: {
        services: {
          some: {
            artist: {
              isNot: null,
            },
          },
        },
      },
    });

    return new AdminMusicianCountDTO({
      total,
      artists,
      mrBeat,
      recording,
      mixMastering,
      albumArt,
    });
  }

  @Transactional()
  async approveMusician(musicianId: string) {
    const musician = await this.musicianRepository.findMusician(musicianId);

    if (musician.isAuthorized && !musician.isPending) {
      throw new CustomException(MUSICIAN_ERROR_CODE.ALREADY_APPROVED);
    }

    await this.musicianRepository.updateMusician(musician.id, {
      isAuthorized: true,
      isPending: false,
    });
  }

  @Transactional()
  async rejectMusician(musicianId: string) {
    const musician = await this.musicianRepository.findMusician(musicianId);

    if (!musician.isAuthorized && !musician.isPending) {
      throw new CustomException(MUSICIAN_ERROR_CODE.ALREADY_APPROVED);
    }

    await this.musicianRepository.updateMusician(musician.id, {
      isAuthorized: false,
      isPending: false,
    });
  }

  @Transactional()
  async updateMusician(musicianId: string, data: UpdateMusicianDTO) {
    const musician = await this.musicianRepository.findMusician(musicianId);

    await this.musicianRepository.updateMusician(musician.id, data);
  }
}
