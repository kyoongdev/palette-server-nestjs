import { Injectable } from '@nestjs/common';

import { ArtistSQL } from '@/sql/artist/artist.sql';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ArtistRepository } from './artist.repository';
import { ArtistDTO, CreateArtistDTO } from './dto';
import { ArtistListDTO } from './dto/artist-list.dto';
import { FindArtistListQuery } from './dto/query';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

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

  async createArtist(musicianId: string, data: CreateArtistDTO) {
    const artist = await this.artistRepository.createArtist(data.toCreateArgs(musicianId));

    return artist.id;
  }
}
