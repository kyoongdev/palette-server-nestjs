import { Injectable } from '@nestjs/common';

import { CommonUserDTO, UpdateUserDTO } from '@/modules/user/dto';
import { UserRepository } from '@/modules/user/user.repository';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminUserCountDTO, AdminUserListDTO } from './dto';
import { AdminFindUserQuery } from './dto/query';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    const user = await this.userRepository.findUser(id);

    return CommonUserDTO.fromFindCommonUser(user);
  }

  async findUsers(paging: PagingDTO, query: AdminFindUserQuery) {
    const count = await this.userRepository.countUser({
      where: query.toFindManyArgs().where,
    });
    const users = await this.userRepository.findUsers({
      ...query.toFindManyArgs(),
    });

    return new PaginationDTO<AdminUserListDTO>(users.map(AdminUserListDTO.fromFindCommonUser), { count, paging });
  }

  async countUsers() {
    const totalCount = await this.userRepository.countUser();
    const userCount = await this.userRepository.countUser({
      where: {
        musician: {
          is: null,
        },
      },
    });
    const musicianCount = await this.userRepository.countUser({
      where: {
        musician: {
          isNot: null,
        },
      },
    });
    return new AdminUserCountDTO({
      totalCount,
      userCount,
      musicianCount,
    });
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.userRepository.findUser(id);
    await this.userRepository.updateUser(id, data.toUpdateArgs());
  }

  async deleteUser(id: string) {
    await this.userRepository.findUser(id);
    await this.userRepository.deleteUser(id);
  }
}
