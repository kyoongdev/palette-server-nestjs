import { Injectable } from '@nestjs/common';

import { ArtistSQL } from '@/sql/artist/artist.sql';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ArtistRepository } from './artist.repository';
import { ArtistListDTO } from './dto/artist-list.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async findArtistsWithSQL(paging: PagingDTO) {
    const sqlPaging = paging.getSqlPaging();
    const { data, count } = await this.artistRepository.findArtistsWithSQL(
      new ArtistSQL({
        paging: sqlPaging,
      }).getSqlQuery()
    );

    return new PaginationDTO(data.map(ArtistListDTO.fromFindSQLArtistList), { count, paging });
  }
}
