import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { InquiryDTO } from '@/modules/inquiry/dto';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminInquiryService } from './inquiry.service';

@ApiTags('[관리자] 문의사항 (고객센터)')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('inquiries')
export class AdminInquiryController {
  constructor(private readonly inquiryService: AdminInquiryService) {}

  @Get(':inquiryId/detail')
  @ApiOperation({ summary: '문의사항 상세 조회 API', description: '문의사항 상세를 조회합니다.' })
  @ResponseApi({
    type: InquiryDTO,
  })
  async findInquiry(@Param('inquiryId') inquiryId: string) {
    return this.inquiryService.findInquiry(inquiryId);
  }

  @Get()
  @ApiQuery({
    type: InquiryDTO,
  })
  @ApiOperation({ summary: '문의사항 목록 조회 API', description: '문의사항 목록을 조회합니다.' })
  @ResponseApi({
    type: InquiryDTO,
    isPaging: true,
  })
  async findInquiries(@Paging() paging: PagingDTO) {
    return this.inquiryService.findInquiries(paging);
  }
}
