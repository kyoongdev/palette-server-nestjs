import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/modules/user/user.repository';
import { PagingDTO } from '@/utils/pagination';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {}

  async findUsers(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
  }
}
