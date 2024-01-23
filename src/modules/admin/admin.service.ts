import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminRepository } from './admin.repository';
import { CommonAdminDTO } from './dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findCommonAdmins(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const admins = await this.adminRepository.findAdmins({
      skip,
      take,
    });

    const count = await this.adminRepository.countAdmins();
    return new PaginationDTO<CommonAdminDTO>(
      admins.map((admin) => new CommonAdminDTO(admin)),
      { count, paging }
    );
  }
}
