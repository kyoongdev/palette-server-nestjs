import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { AnnouncementService } from './announcement.service';
import { AnnouncementDTO } from './dto';

@ApiTags('공지사항')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

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

  @Get(':announcementId')
  @ApiOperation({ summary: '공지사항 조회 API', description: '공지사항을 조회합니다.' })
  @ResponseApi({ type: AnnouncementDTO })
  async findAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.findAnnouncement(announcementId);
  }
}
