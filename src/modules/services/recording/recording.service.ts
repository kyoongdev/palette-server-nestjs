import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { RegionRepository } from '@/modules/region/region.repository';
import { RecordingSQL } from '@/sql/recording';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateRecordingDTO, RecordingListDTO, UpdateRecordingDTO } from './dto';
import { FindRecordingListQuery } from './dto/query';
import { RecordingDTO } from './dto/recording.dto';
import { RECORDING_ERROR_CODE } from './exception/error-code';
import { RecordingRepository } from './recording.repository';

@Injectable()
export class RecordingService {
  constructor(
    private readonly recordingRepository: RecordingRepository,
    private readonly findRepository: FileRepository,
    private readonly regionRepository: RegionRepository,
    private readonly licenseRepository: LicenseRepository
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
    const imageIds = await Promise.all(
      data.images.map(async (image) => {
        const file = await this.findRepository.findImage(image.imageId);

        return file.id;
      })
    );
    const isThumbnailExist = data.images.some((image) => image.isThumbnail);
    const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;
    const isImageDuplicate = imageIds.length !== new Set(imageIds).size;

    if (thumbnailCount > 1) {
      throw new CustomException(RECORDING_ERROR_CODE.ONLY_ONE_THUMBNAIL);
    }

    if (!isThumbnailExist) {
      throw new CustomException(RECORDING_ERROR_CODE.NO_THUMBNAIL);
    }

    if (isImageDuplicate) {
      throw new CustomException(RECORDING_ERROR_CODE.IMAGE_ID_DUPLICATED);
    }

    const licenseIds = await Promise.all(
      data.licenses.map(async (data) => {
        const license = await this.licenseRepository.findLicense(data.licenseId);

        return license.id;
      })
    );

    const isLicenseDuplicate = licenseIds.length !== new Set(licenseIds).size;

    if (isLicenseDuplicate) {
      throw new CustomException(RECORDING_ERROR_CODE.LICENSE_ID_DUPLICATED);
    }

    const largeGroup = await this.regionRepository.findRegionLargeGroup(data.region.regionLargeGroupId);
    if (data.region.regionSmallGroupId) {
      const isSmallGroupExists = largeGroup.regions.find((region) => region.id === data.region.regionSmallGroupId);
      if (!isSmallGroupExists) {
        throw new CustomException(RECORDING_ERROR_CODE.REGION_SMALL_GROUP_NOT_MATCH);
      }
    }

    const recording = await this.recordingRepository.createRecording(data.toCreateArgs(musicianId));

    return recording.id;
  }

  @Transactional()
  async updateRecording(id: string, musicianId: string, data: UpdateRecordingDTO) {
    if (data.images) {
      const imageIds = await Promise.all(
        data.images.map(async (image) => {
          const file = await this.findRepository.findImage(image.imageId);

          return file.id;
        })
      );
      const isThumbnailExist = data.images.some((image) => image.isThumbnail);
      const thumbnailCount = data.images.filter((image) => image.isThumbnail).length;
      const isImageDuplicate = imageIds.length !== new Set(imageIds).size;

      if (thumbnailCount > 1) {
        throw new CustomException(RECORDING_ERROR_CODE.ONLY_ONE_THUMBNAIL);
      }

      if (!isThumbnailExist) {
        throw new CustomException(RECORDING_ERROR_CODE.NO_THUMBNAIL);
      }

      if (isImageDuplicate) {
        throw new CustomException(RECORDING_ERROR_CODE.IMAGE_ID_DUPLICATED);
      }
    }

    if (data.licenses) {
      const licenseIds = await Promise.all(
        data.licenses.map(async (data) => {
          const license = await this.licenseRepository.findLicense(data.licenseId);

          return license.id;
        })
      );

      const isLicenseDuplicate = licenseIds.length !== new Set(licenseIds).size;

      if (isLicenseDuplicate) {
        throw new CustomException(RECORDING_ERROR_CODE.LICENSE_ID_DUPLICATED);
      }
    }

    if (data.region) {
      const largeGroup = await this.regionRepository.findRegionLargeGroup(data.region.regionLargeGroupId);
      if (data.region.regionSmallGroupId) {
        const isSmallGroupExists = largeGroup.regions.find((region) => region.id === data.region.regionSmallGroupId);
        if (!isSmallGroupExists) {
          throw new CustomException(RECORDING_ERROR_CODE.REGION_SMALL_GROUP_NOT_MATCH);
        }
      }
    }

    const recording = await this.recordingRepository.findRecording(id);

    if (recording.musicianService.musician.id !== musicianId) {
      throw new CustomException(RECORDING_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

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
