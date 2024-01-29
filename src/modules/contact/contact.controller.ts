import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { ContactService } from './contact.service';
import { ContactDTO } from './dto';

@ApiTags('연락수단')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ summary: '연락수단 목록 조회 API', description: '연락수단 목록을 조회합니다.' })
  @ResponseApi({
    type: ContactDTO,
    isArray: true,
  })
  async findContacts() {
    return await this.contactService.findContacts();
  }
}
