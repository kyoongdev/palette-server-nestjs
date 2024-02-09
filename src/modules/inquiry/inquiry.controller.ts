import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { RequestUser } from '@/interface/token.interface';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { CreateInquiryDTO, InquiryDTO, UpdateInquiryDTO } from './dto';
import { InquiryService } from './inquiry.service';

@ApiTags('문의사항 (고객센터)')
@Controller('inquiries')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Get()
  @ApiQuery({
    type: PagingDTO,
  })
  @ApiOperation({ summary: '나의 문의사항 목록 조회 API', description: '나의 문의사항 목록을 조회합니다.' })
  @ResponseApi({
    type: InquiryDTO,
    isPaging: true,
  })
  async findInquiries(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return this.inquiryService.findInquiries(user.id, paging);
  }

  @Get(':inquiryId/detail')
  @ApiOperation({ summary: '나의 문의사항 상세 조회 API', description: '나의 문의사항 상세를 조회합니다.' })
  @ResponseApi({ type: InquiryDTO })
  async findInquiry(@Param('inquiryId') inquiryId: string, @ReqUser() user: RequestUser) {
    return this.inquiryService.findInquiry(inquiryId, user.id);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '문의사항 등록 API', description: '문의사항을 등록합니다.' })
  @ResponseApi({ type: ResponseWithIdDTO }, 201)
  async createInquiry(@ReqUser() user: RequestUser, @Body() data: CreateInquiryDTO) {
    return this.inquiryService.createInquiry(user.id, data);
  }

  @Patch(':inquiryId')
  @ApiOperation({ summary: '문의사항 수정 API', description: '문의사항을 수정합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async updateInquiry(
    @Param('inquiryId') inquiryId: string,
    @ReqUser() user: RequestUser,
    @Body() data: UpdateInquiryDTO
  ) {
    return this.inquiryService.updateInquiry(inquiryId, user.id, data);
  }

  @Delete(':inquiryId')
  @ApiOperation({ summary: '문의사항 삭제 API', description: '문의사항을 삭제합니다.' })
  @ResponseApi({ type: EmptyResponseDTO }, 204)
  async deleteInquiry(@Param('inquiryId') inquiryId: string, @ReqUser() user: RequestUser) {
    return this.inquiryService.deleteInquiry(inquiryId, user.id);
  }
}
