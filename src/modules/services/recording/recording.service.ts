import { Injectable } from '@nestjs/common';

import { RecordingSQL } from '@/sql/recording';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { RecordingListDTO } from './dto';
import { RecordingDTO } from './dto/recording.dto';
import { RecordingRepository } from './recording.repository';

@Injectable()
export class RecordingService {
  constructor(private readonly recordingRepository: RecordingRepository) {}

  async findRecording(id: string) {
    const recording = await this.recordingRepository.findRecording(id);

    return RecordingDTO.fromFindRecording(recording);
  }

  async findRecordingsWithSQL(paging: PagingDTO) {
    const sqlPaging = paging.getSqlPaging();

    const { data, count } = await this.recordingRepository.findRecordingsWithSQL(
      new RecordingSQL({
        paging: sqlPaging,
      }).getSqlQuery()
    );

    return new PaginationDTO<RecordingListDTO>(data.map(RecordingListDTO.fromFindSQLRecordingList), { count, paging });
  }

  async createRecording(musicianId: string) {}
}
