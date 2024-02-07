import { Module } from '@nestjs/common';

import { InquiryController } from './inquiry.controller';
import { InquiryRepository } from './inquiry.repository';
import { InquiryService } from './inquiry.service';

@Module({
  providers: [InquiryRepository, InquiryService],
  controllers: [InquiryController],
})
export class InquiryModule {}
