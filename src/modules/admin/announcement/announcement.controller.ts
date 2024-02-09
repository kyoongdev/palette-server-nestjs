import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '@/modules/announcement/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminAnnouncementService } from './announcement.service';

@ApiTags('[관리자] 공지사항')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('announcements')
export class AdminAnnouncementController {
  constructor(private readonly announcementService: AdminAnnouncementService) {}

  @Get('')
  @ApiQuery({
    type: PagingDTO,
  })
  @ApiOperation({ summary: '공지사항 목록 조회 API', description: '공지사항 목록을 조회합니다.' })
  @ResponseApi({
    type: AnnouncementDTO,
    isPaging: true,
  })
  async findAnnouncements(@Paging() paging: PagingDTO) {
    return await this.announcementService.findAnnouncements(paging);
  }

  @Get(':announcementId/detail')
  @ApiOperation({ summary: '공지사항 조회 API', description: '공지사항을 조회합니다.' })
  @ResponseApi({ type: AnnouncementDTO })
  async findAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.findAnnouncement(announcementId);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '공지사항 생성 API', description: '공지사항을 생성합니다.' })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createAnnouncement(@Body() body: CreateAnnouncementDTO) {
    return await this.announcementService.createAnnouncement(body);
  }

  @Patch(':announcementId')
  @ApiOperation({ summary: '공지사항 수정 API', description: '공지사항을 수정합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async updateAnnouncement(@Param('announcementId') announcementId: string, @Body() body: UpdateAnnouncementDTO) {
    await this.announcementService.updateAnnouncement(announcementId, body);
  }

  @Delete(':announcementId')
  @ApiOperation({ summary: '공지사항 삭제 API', description: '공지사항을 삭제합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteAnnouncement(@Param('announcementId') announcementId: string) {
    await this.announcementService.deleteAnnouncement(announcementId);
  }
}
