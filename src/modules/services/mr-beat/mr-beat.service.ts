import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { MrBeatSQL } from '@/sql';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateMrBeatDTO, MrBeatDTO, UpdateMrBeatDTO } from './dto';
import { MrBeatListDTO } from './dto/mr-beat-list.dto';
import { FindMrBeatsQuery } from './dto/query/find-mr-beats.query';
import { MR_BEAT_ERROR_CODE } from './exception/error-code';
import { MrBeatRepository } from './mr-beat.repository';

@Injectable()
export class MrBeatService {
  constructor(private readonly mrBeatRepository: MrBeatRepository) {}

  async findMrBeat(id: string) {
    const mrBeat = await this.mrBeatRepository.findMrBeat(id);

    return MrBeatDTO.fromFindMrBeat(mrBeat);
  }

  async findMrBeatsWithSQL(paging: PagingDTO, query?: FindMrBeatsQuery) {
    const sql = new MrBeatSQL({
      paging: paging.getSqlPaging(),
      query,
    });

    const { data, count } = await this.mrBeatRepository.findMrBeatsWithSQL(sql.getSqlQuery());

    return new PaginationDTO<MrBeatListDTO>(data.map(MrBeatListDTO.fromFindSQLMrBeatList), { count, paging });
  }

  async createMrBeat(musicianId: string, data: CreateMrBeatDTO) {
    const newMrBeat = await this.mrBeatRepository.createMrBeat(data.toCreateArgs(musicianId));

    return newMrBeat.id;
  }

  async updateMrBeat(id: string, musicianId: string, data: UpdateMrBeatDTO) {
    const mrBeat = await this.findMrBeat(id);

    if (mrBeat.musician.id !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    await this.mrBeatRepository.updateMrBeat(id, {
      ...data.toUpdateArgs(),
      isAuthorized: false,
      isPending: true,
    });
  }

  async deleteMrBeat(id: string, musicianId: string) {
    const mrBeat = await this.findMrBeat(id);

    if (mrBeat.musician.id !== musicianId) {
      throw new CustomException(MR_BEAT_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }
  }
}
