import { Injectable } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import { Transactional } from '@/utils/aop/transaction/transaction';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cls: ClsService
  ) {}

  @Transactional()
  async findUsers() {
    console.log('findUsers 실행');
    console.log(this.cls.get('test'));
    return await this.userRepository.findUsers();
  }

  async findUser(id: string) {
    return this.userRepository.findUser(id);
  }

  async createUser(data: CreateUserDTO) {}

  async updateUser(id: string, data: UpdateUserDTO) {}

  async deleteUser(id: string) {}
}
