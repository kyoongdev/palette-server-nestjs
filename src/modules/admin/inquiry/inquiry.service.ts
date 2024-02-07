import { Injectable } from '@nestjs/common';

import { InquiryDTO } from '@/modules/inquiry/dto';
import { InquiryRepository } from '@/modules/inquiry/inquiry.repository';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

@Injectable()
export class AdminInquiryService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async findInquiry(id: string) {
    const inquiry = await this.inquiryRepository.findInquiry(id);

    return InquiryDTO.fromFindInquiry(inquiry);
  }

  async findInquiries(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const inquiries = await this.inquiryRepository.findInquiries({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.inquiryRepository.countInquiries();

    return new PaginationDTO(inquiries.map(InquiryDTO.fromFindInquiry), { count, paging });
  }
}
