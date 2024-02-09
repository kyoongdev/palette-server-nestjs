import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';

import { AdminContactController } from './contact.controller';
import { AdminContactService } from './contact.service';

@Module({
  providers: [ContactRepository, AdminContactService],
  controllers: [AdminContactController],
})
export class AdminContactModule {}
