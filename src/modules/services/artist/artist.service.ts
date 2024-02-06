import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ArtistSQL } from '@/sql/artist/artist.sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ValidateServiceProvider } from '../validation/validate-service.provider';

import { ArtistRepository } from './artist.repository';
import { ArtistDTO, CreateArtistDTO, UpdateArtistDTO } from './dto';
import { ArtistListDTO } from './dto/artist-list.dto';
import { FindArtistListQuery } from './dto/query';
import { ARTIST_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findArtist(id: string) {
    const artist = await this.artistRepository.findArtist(id);

    return ArtistDTO.fromArtist(artist);
  }

  async findArtistsWithSQL(paging: PagingDTO, query: FindArtistListQuery) {
    const sqlPaging = paging.getSqlPaging();
    const { data, count } = await this.artistRepository.findArtistsWithSQL(
      new ArtistSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO(data.map(ArtistListDTO.fromFindSQLArtistList), { count, paging });
  }

  @Transactional()
  async createArtist(musicianId: string, data: CreateArtistDTO) {
    await this.validateService.validateArtist(data);
    const artist = await this.artistRepository.createArtist(data.toCreateArgs(musicianId));

    return artist.id;
  }

  @Transactional()
  async updateArtist(id: string, musicianId: string, data: UpdateArtistDTO) {
    const artist = await this.artistRepository.findArtist(id);

    if (artist.musicianService.musicianId !== musicianId) {
      throw new CustomException(ARTIST_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (!artist.isAuthorized) {
      throw new CustomException(ARTIST_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }

    await this.validateService.validateArtist(data);
    await this.artistRepository.updateArtist(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteArtist(id: string, musicianId: string) {
    const artist = await this.findArtist(id);

    if (artist.musician.id !== musicianId) {
      throw new CustomException(ARTIST_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.artistRepository.deleteArtist(id);
  }
}
