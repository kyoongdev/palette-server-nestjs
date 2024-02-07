import { Module } from '@nestjs/common';

import { AnnouncementRepository } from '@/modules/announcement/announcement.repository';

import { AdminAnnouncementController } from './announcement.controller';
import { AdminAnnouncementService } from './announcement.service';

@Module({
  providers: [AnnouncementRepository, AdminAnnouncementService],
  controllers: [AdminAnnouncementController],
})
export class AdminAnnouncementModule {}
