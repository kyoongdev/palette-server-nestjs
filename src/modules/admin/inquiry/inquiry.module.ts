import { Module } from '@nestjs/common';

import { InquiryRepository } from '@/modules/inquiry/inquiry.repository';

import { AdminInquiryController } from './inquiry.controller';
import { AdminInquiryService } from './inquiry.service';

@Module({
  providers: [InquiryRepository, AdminInquiryService],
  controllers: [AdminInquiryController],
})
export class AdminInquiryModule {}
