import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { AlbumArtSQL } from '@/sql/album-art/album-art.sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ValidateServiceProvider } from '../validation/validate-service.provider';

import { AlbumArtRepository } from './album-art.repository';
import { AlbumArtDTO, AlbumArtListDTO, CreateAlbumArtDTO, UpdateAlbumArtDTO } from './dto';
import { FindAlbumArtQuery } from './dto/query/find-album-art.query';
import { ALBUM_ART_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AlbumArtService {
  constructor(
    private readonly albumArtRepository: AlbumArtRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findAlbumArt(id: string) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    return AlbumArtDTO.fromFindAlbumArt(albumArt);
  }

  async findSQLAlbumArt(paging: PagingDTO, query: FindAlbumArtQuery) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.albumArtRepository.findAlbumArtsWithSQL(
      new AlbumArtSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO<AlbumArtListDTO>(data.map(AlbumArtListDTO.fromFindSQLAlbumArt), { paging, count });
  }

  @Transactional()
  async createAlbumArt(musicianId: string, data: CreateAlbumArtDTO) {
    await this.validateService.validateAlbumArt(data);
    const albumArt = await this.albumArtRepository.createAlbumArt(data.toCreateArgs(musicianId));

    return albumArt.id;
  }

  @Transactional()
  async updateAlbumArt(id: string, musicianId: string, data: UpdateAlbumArtDTO) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    if (albumArt.musicianService.musicianId !== musicianId) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (!albumArt.isAuthorized) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }

    await this.validateService.validateAlbumArt(data);

    await this.albumArtRepository.updateAlbumArt(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteAlbumArt(id: string, musicianId: string) {
    const albumArt = await this.albumArtRepository.findAlbumArt(id);

    if (albumArt.musicianService.musicianId !== musicianId) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.albumArtRepository.deleteAlbumArt(id);
  }
}
