import { Module } from '@nestjs/common';

import { AnnouncementController } from './announcement.controller';
import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementService } from './announcement.service';

@Module({
  providers: [AnnouncementRepository, AnnouncementService],
  controllers: [AnnouncementController],
})
export class AnnouncementModule {}
