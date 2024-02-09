import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { CreateContactDTO, UpdateContactDTO } from '@/modules/contact/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminContactService } from './contact.service';
import { AdminContactDTO } from './dto';

@ApiTags('[관리자] 연락수단')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('contacts')
export class AdminContactController {
  constructor(private readonly contactService: AdminContactService) {}

  @Get(':contactId/detail')
  @ApiOperation({ summary: '연락 수단 조회 상세 조회 API', description: '연락 수단 상세 조회 API' })
  @ResponseApi({
    type: AdminContactDTO,
  })
  async findContact(@Param('contactId') contactId: string) {
    return await this.contactService.findContact(contactId);
  }

  @Get()
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '연락 수단 목록 조회 API', description: '연락 수단 목록 조회 API' })
  @ResponseApi({
    type: AdminContactDTO,
    isPaging: true,
  })
  async findContacts(@Paging() paging: PagingDTO) {
    return await this.contactService.findContacts(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '연락 수단 생성 API', description: '연락 수단 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createContact(@Body() body: CreateContactDTO) {
    return await this.contactService.createContact(body);
  }

  @Patch(':contactId')
  @ApiOperation({ summary: '연락 수단 수정 API', description: '연락 수단 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateContact(@Param('contactId') contactId: string, @Body() body: UpdateContactDTO) {
    return await this.contactService.updateContact(contactId, body);
  }

  @Delete(':contactId')
  @ApiOperation({ summary: '연락 수단 삭제 API', description: '연락 수단 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteContact(@Param('contactId') contactId: string) {
    return await this.contactService.deleteContact(contactId);
  }
}
