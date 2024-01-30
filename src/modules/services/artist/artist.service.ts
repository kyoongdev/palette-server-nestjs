import { Injectable } from '@nestjs/common';

import { ArtistSQL } from '@/sql/artist/artist.sql';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ArtistRepository } from './artist.repository';

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
    console.log(data[0].saleTypes);

    return new PaginationDTO<any>(data as any, { count, paging });
  }
}
