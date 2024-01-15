import { Injectable } from '@nestjs/common';

import { Transactional } from '@/common/decorator/transaction.decorator';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  async findUsers() {
    return this.userRepository.findUser();
  }
}
