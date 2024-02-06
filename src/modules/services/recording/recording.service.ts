import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { RecordingSQL } from '@/sql/recording';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ValidateServiceProvider } from '../validation/validate-service.provider';

import { CreateRecordingDTO, RecordingListDTO, UpdateRecordingDTO } from './dto';
import { FindRecordingListQuery } from './dto/query';
import { RecordingDTO } from './dto/recording.dto';
import { RECORDING_ERROR_CODE } from './exception/error-code';
import { RecordingRepository } from './recording.repository';

@Injectable()
export class RecordingService {
  constructor(
    private readonly recordingRepository: RecordingRepository,
    private readonly validateService: ValidateServiceProvider
  ) {}

  async findRecording(id: string) {
    const recording = await this.recordingRepository.findRecording(id);

    return RecordingDTO.fromFindRecording(recording);
  }

  async findRecordingsWithSQL(paging: PagingDTO, query: FindRecordingListQuery) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.recordingRepository.findRecordingsWithSQL(
      new RecordingSQL({
        paging: sqlPaging,
        query,
      }).getSqlQuery()
    );

    return new PaginationDTO<RecordingListDTO>(data.map(RecordingListDTO.fromFindSQLRecordingList), { count, paging });
  }

  @Transactional()
  async createRecording(musicianId: string, data: CreateRecordingDTO) {
    await this.validateService.validateRecording(data);

    const recording = await this.recordingRepository.createRecording(data.toCreateArgs(musicianId));

    return recording.id;
  }

  @Transactional()
  async updateRecording(id: string, musicianId: string, data: UpdateRecordingDTO) {
    const recording = await this.recordingRepository.findRecording(id);

    if (recording.musicianService.musician.id !== musicianId) {
      throw new CustomException(RECORDING_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    if (!recording.isAuthorized) {
      throw new CustomException(RECORDING_ERROR_CODE.ONLY_AUTHORIZE_CAN_UPDATE);
    }

    await this.validateService.validateRecording(data);
    await this.recordingRepository.updateRecording(id, data.toUpdateArgs());
  }

  @Transactional()
  async deleteRecording(id: string, musicianId: string) {
    const recording = await this.recordingRepository.findRecording(id);

    if (recording.musicianService.musician.id !== musicianId) {
      throw new CustomException(RECORDING_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.recordingRepository.deleteRecording(id);
  }
}
