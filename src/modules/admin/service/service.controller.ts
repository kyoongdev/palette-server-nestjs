import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { AlbumArtDTO, UpdateAlbumArtDTO } from '@/modules/services/album-art/dto';
import { ArtistDTO, UpdateArtistDTO } from '@/modules/services/artist/dto';
import { MixMasteringDTO, UpdateMixMasteringDTO } from '@/modules/services/mix-mastering/dto';
import { MrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { RecordingDTO, UpdateRecordingDTO } from '@/modules/services/recording/dto';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminAlbumArtService } from './album-art/album-art.service';
import { AdminArtistService } from './artist/artist.service';
import { ApproveServiceDTO, RejectServiceDTO, ServiceCountDTO } from './dto';
import { FindServiceQuery } from './dto/query/find-service.query';
import { ServiceListDTO } from './dto/service-list.dto';
import { AdminMixMasteringService } from './mix-mastering/mix-mastering.service';
import { AdminMrBeatService } from './mr-beat/mr-beat.service';
import { AdminRecordingService } from './recording/recording.service';
import { AdminServiceService } from './service.service';

@ApiTags('[관리자] 서비스')
@Controller('services')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminServiceController {
  constructor(
    private readonly serviceService: AdminServiceService,
    private readonly mrBeatService: AdminMrBeatService,
    private readonly artistService: AdminArtistService,
    private readonly albumArtService: AdminAlbumArtService,
    private readonly mixMasteringService: AdminMixMasteringService,
    private readonly recordingService: AdminRecordingService
  ) {}

  @Get()
  @ApiOperation({ summary: '서비스 목록 조회 API', description: '서비스 목록 조회' })
  @ResponseApi({
    type: ServiceListDTO,
    isPaging: true,
  })
  async findServices(@Paging() paging: PagingDTO, @Query() query: FindServiceQuery) {
    return await this.serviceService.findServices(paging, query);
  }

  @Get('count')
  @ApiOperation({ summary: '서비스 카운트 API', description: '서비스 카운트' })
  @ResponseApi({
    type: ServiceCountDTO,
  })
  async countServices() {
    return await this.serviceService.countServices();
  }

  @Get(':serviceId/mr-beats/detail')
  @ApiOperation({ description: 'MrBeat 상세 조회', summary: 'MrBeat 상세 조회 API' })
  @ResponseApi({
    type: MrBeatDTO,
  })
  async findMrBeat(@Param('serviceId') serviceId: string) {
    return await this.mrBeatService.findMrBeatByServiceId(serviceId);
  }

  @Get(':serviceId/artists/detail')
  @ApiOperation({ description: '아티스트 상세 조회', summary: '아티스트 상세 조회 API' })
  @ResponseApi({
    type: ArtistDTO,
  })
  async findArtist(@Param('serviceId') serviceId: string) {
    return await this.artistService.findArtistByServiceId(serviceId);
  }

  @Get(':serviceId/album-arts/detail')
  @ApiOperation({ description: '앨범 아트 상세 조회', summary: '앨범 아트 상세 조회 API' })
  @ResponseApi({
    type: AlbumArtDTO,
  })
  async findAlbumArt(@Param('serviceId') serviceId: string) {
    return await this.albumArtService.findAlbumArtByServiceId(serviceId);
  }

  @Get(':serviceId/mix-masterings/detail')
  @ApiOperation({ description: '믹스 마스터링 상세 조회', summary: '믹스 마스터링 상세 조회 API' })
  @ResponseApi({
    type: MixMasteringDTO,
  })
  async findMixMastering(@Param('serviceId') serviceId: string) {
    return await this.mixMasteringService.findMixMasteringByServiceId(serviceId);
  }

  @Get(':serviceId/recordings/detail')
  @ApiOperation({ description: '녹음 상세 조회', summary: '녹음 상세 조회 API' })
  @ResponseApi({
    type: RecordingDTO,
  })
  async findRecording(@Param('serviceId') serviceId: string) {
    return await this.recordingService.findRecordingByServiceId(serviceId);
  }

  @Patch('/mr-beats/:mrBeatId')
  @ApiOperation({ description: 'MrBeat 수정', summary: 'MrBeat 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMrBeat(@Param('mrBeatId') mrBeatId: string, @Body() body: UpdateMrBeatDTO) {
    return await this.mrBeatService.updateMrBeat(mrBeatId, body);
  }

  @Patch('/artists/:artistId')
  @ApiOperation({ description: '아티스트 수정', summary: '아티스트 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateArtist(@Param('artistId') artistId: string, @Body() body: UpdateArtistDTO) {
    return await this.artistService.updateArtist(artistId, body);
  }

  @Patch('/album-arts/:albumArtId')
  @ApiOperation({ description: '앨범 아트 수정', summary: '앨범 아트 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAlbumArt(@Param('albumArtId') albumArtId: string, @Body() body: UpdateAlbumArtDTO) {
    return await this.albumArtService.updateAlbumArt(albumArtId, body);
  }

  @Patch('/mix-masterings/:mixMasteringId')
  @ApiOperation({ description: '믹스 마스터링 수정', summary: '믹스 마스터링 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMixMastering(@Param('mixMasteringId') mixMasteringId: string, @Body() body: UpdateMixMasteringDTO) {
    return await this.mixMasteringService.updateMixMastering(mixMasteringId, body);
  }

  @Patch('/recordings/:recordingId')
  @ApiOperation({ description: '녹음 수정', summary: '녹음 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRecording(@Param('recordingId') recordingId: string, @Body() body: UpdateRecordingDTO) {
    return await this.recordingService.updateRecording(recordingId, body);
  }

  @Delete('/mr-beats/:mrBeatId')
  @ApiOperation({ description: 'MrBeat 삭제', summary: 'MrBeat 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMrBeat(@Param('mrBeatId') mrBeatId: string) {
    return await this.mrBeatService.deleteMrBeat(mrBeatId);
  }

  @Delete('/artists/:artistId')
  @ApiOperation({ description: '아티스트 삭제', summary: '아티스트 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteArtist(@Param('artistId') artistId: string) {
    return await this.artistService.deleteArtist(artistId);
  }

  @Delete('/album-arts/:albumArtId')
  @ApiOperation({ description: '앨범 아트 삭제', summary: '앨범 아트 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAlbumArt(@Param('albumArtId') albumArtId: string) {
    return await this.albumArtService.deleteAlbumArt(albumArtId);
  }

  @Delete('/mix-masterings/:mixMasteringId')
  @ApiOperation({ description: '믹스 마스터링 삭제', summary: '믹스 마스터링 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMixMastering(@Param('mixMasteringId') mixMasteringId: string) {
    return await this.mixMasteringService.deleteMixMastering(mixMasteringId);
  }

  @Delete('/recordings/:recordingId')
  @ApiOperation({ description: '녹음 삭제', summary: '녹음 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRecording(@Param('recordingId') recordingId: string) {
    return await this.recordingService.deleteRecording(recordingId);
  }

  @Post(':serviceId/approve')
  @ApiOperation({ summary: '서비스 승인 API', description: '서비스 승인' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async approveService(@Param('serviceId') serviceId: string, @Body() body: ApproveServiceDTO) {
    await this.serviceService.approveService(serviceId, body);
  }

  @Post(':serviceId/reject')
  @ApiOperation({ summary: '서비스 반려 API', description: '서비스 반려' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async rejectService(@Param('serviceId') serviceId: string, @Body() body: RejectServiceDTO) {
    await this.serviceService.rejectService(serviceId, body);
  }
}
