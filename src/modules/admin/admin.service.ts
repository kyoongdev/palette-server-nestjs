import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findAdmins(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const admins = await this.adminRepository.findAdmins({
      skip,
      take,
    });

    const count = await this.adminRepository.countAdmins();
    return new PaginationDTO(admins, { count, paging });
  }
}
