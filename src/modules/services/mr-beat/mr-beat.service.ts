import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { MrBeatSQL } from '@/sql';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ValidateServiceProvider } from '../validation/validate-service.provider';

import { CreateMrBeatDTO, MrBeatDTO, UpdateMrBeatDTO } from './dto';
import { MrBeatListDTO } from './dto/mr-beat-list.dto';
import { FindMrBeatsQuery } from './dto/query/find-mr-beats.query';
import { MR_BEAT_ERROR_CODE } from './exception/error-code';
import { MrBeatRepository } from './mr-beat.repository';

@Injectable()
export class MrBeatService {
  constructor(
    private readonly mrBeatRepository: MrBeatRepository,
    private readonly validateService: ValidateServiceProvider,
    private readonly mrBeatSQL: MrBeatSQL
  ) {}

  async findMrBeat(id: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeat(id);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  async findMrBeatsWithSQL(paging: PagingDTO, query?: FindMrBeatsQuery) {
    const { data, count } = await this.mrBeatRepository.findMrBeatsWithSQL(
      this.mrBeatSQL.getSqlQuery({ paging: paging.getSqlPaging(), query, isAdmin: false })
    );

    return new PaginationDTO<MrBeatListDTO>(data.map(MrBeatListDTO.fromFindSQLMrBeatList), { count, paging });
  }

  @Transactional()
  async createMrBeat(musicianId: string, data: CreateMrBeatDTO) {
    await this.validateService.validateMrBeat(data);
    const newMrBeat = await this.mrBeatRepository.createMrBeat(data.toCreateArgs(musicianId));

    return newMrBeat.id;
  }

  @Transactional()
  async updateMrBeat(id: string, musicianId: string, data: UpdateMrBeatDTO) {
    const mrBeat = await this.mrBeatRepository.findMrBeat(id);

    if (!mrBeat.isAuthorized) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }

    if (mrBeat.musicianService.musicianId !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    await this.validateService.validateMrBeat(data);
    await this.mrBeatRepository.updateMrBeat(id, {
      ...data.toUpdateArgs(),
      isAuthorized: false,
      isPending: true,
    });
  }

  @Transactional()
  async deleteMrBeat(id: string, musicianId: string) {
    const mrBeat = await this.findMrBeat(id);

    if (mrBeat.musician.id !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }
  }
}
