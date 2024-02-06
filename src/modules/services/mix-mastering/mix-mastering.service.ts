import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { MixMasteringSQL } from '@/sql/mix-mastering';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ValidateServiceProvider } from '../validation/validate-service.provider';

import { CreateMixMasteringDTO, MixMasteringDTO, MixMasteringListDTO, UpdateMixMasteringDTO } from './dto';
import { FindMixMasteringQuery } from './dto/query';
import { MIX_MASTERING_ERROR_CODE } from './exception/error-code';
import { MixMasteringRepository } from './mix-mastering.repository';

@Injectable()
export class MixMasteringService {
  constructor(
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findMixMastering(id: string) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    return MixMasteringDTO.fromFindMixMastering(mixMastering);
  }

  async findSQLMixMasterings(paging: PagingDTO, query: FindMixMasteringQuery) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.mixMasteringRepository.findSQLMixMasterings(
      new MixMasteringSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO<MixMasteringListDTO>(data.map(MixMasteringListDTO.fromFindSQLMixMastering), {
      count,
      paging,
    });
  }

  @Transactional()
  async createMixMastering(musicianId: string, data: CreateMixMasteringDTO) {
    await this.validateService.validateMixMastering(data);

    const mixMastering = await this.mixMasteringRepository.createMixMastering(data.toCreateArgs(musicianId));

    return mixMastering.id;
  }

  @Transactional()
  async updateMixMastering(id: string, musicianId: string, data: UpdateMixMasteringDTO) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    if (mixMastering.musicianService.musician.id !== musicianId) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (!mixMastering.isAuthorized) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }
    await this.validateService.validateMixMastering(data);

    await this.mixMasteringRepository.updateMixMastering(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteMixMastering(id: string, musicianId: string) {
    const mixMastering = await this.mixMasteringRepository.findMixMastering(id);

    if (mixMastering.musicianService.musician.id !== musicianId) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.mixMasteringRepository.deleteMixMastering(id);
  }
}
