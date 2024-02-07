import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateInquiryDTO, InquiryDTO } from './dto';
import { INQUIRY_ERROR_CODE } from './exception/error-code';
import { InquiryRepository } from './inquiry.repository';

@Injectable()
export class InquiryService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async findInquiry(id: string, userId: string) {
    const inquiry = await this.inquiryRepository.findInquiry(id);

    if (inquiry.userId !== userId) {
      throw new CustomException(INQUIRY_ERROR_CODE.CAN_READ_ONLY_MY_INQUIRY);
    }

    return InquiryDTO.fromFindInquiry(inquiry);
  }

  async findInquiries(userId: string, paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const inquiries = await this.inquiryRepository.findInquiries({
      where: {
        userId,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.inquiryRepository.countInquiries({
      where: {
        userId,
      },
    });

    return new PaginationDTO(inquiries.map(InquiryDTO.fromFindInquiry), { count, paging });
  }

  async createInquiry(userId: string, data: CreateInquiryDTO) {
    const inquiry = await this.inquiryRepository.createInquiry({
      content: data.content,
      user: {
        connect: {
          id: userId,
        },
      },
    });

    return inquiry.id;
  }

  async updateInquiry(id: string, userId: string, data: CreateInquiryDTO) {
    const inquiry = await this.inquiryRepository.findInquiry(id);

    if (inquiry.userId !== userId) {
      throw new CustomException(INQUIRY_ERROR_CODE.ONLY_OWNER_CAN_UPDATE);
    }

    await this.inquiryRepository.updateInquiry(id, {
      content: data.content,
    });
  }

  async deleteInquiry(id: string, userId: string) {
    const inquiry = await this.inquiryRepository.findInquiry(id);

    if (inquiry.userId !== userId) {
      throw new CustomException(INQUIRY_ERROR_CODE.ONLY_OWNER_CAN_DELETE);
    }

    await this.inquiryRepository.deleteInquiry(id);
  }
}
