import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { ArtistSQL } from '@/sql/artist/artist.sql';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ArtistRepository } from './artist.repository';
import { ArtistDTO, CreateArtistDTO } from './dto';
import { ArtistListDTO } from './dto/artist-list.dto';
import { FindArtistListQuery } from './dto/query';
import { ARTIST_ERROR_CODE } from './exception/error-code';

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
    const isThumbnailExist = data.images.some((image) => image.isThumbnail);

    if (!isThumbnailExist) throw new CustomException(ARTIST_ERROR_CODE.NO_THUMBNAIL);

    const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;

    if (thumbnailCount > 1) throw new CustomException(ARTIST_ERROR_CODE.ONLY_ONE_THUMBNAIL);

    const imageIds = data.images.map((image) => image.imageId);
    const contactIds = data.contacts.map((contact) => contact.contactId);
    const licenseIds = data.licenses.map((license) => license.licenseId);
    const saleTypeIds = data.saleTypeIds;

    const isImageIdDuplicated = imageIds.length !== new Set(imageIds).size;
    const isContactIdDuplicated = contactIds.length !== new Set(contactIds).size;
    const isLicenseIdDuplicated = licenseIds.length !== new Set(licenseIds).size;
    const isSaleIdDuplicated = saleTypeIds.length !== new Set(saleTypeIds).size;

    if (isImageIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.IMAGE_ID_DUPLICATED);
    if (isContactIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.CONTACT_ID_DUPLICATED);
    if (isLicenseIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.LICENSE_ID_DUPLICATED);
    if (isSaleIdDuplicated) throw new CustomException(ARTIST_ERROR_CODE.SALE_ID_DUPLICATED);

    const artist = await this.artistRepository.createArtist(data.toCreateArgs(musicianId));

    return artist.id;
  }
}
