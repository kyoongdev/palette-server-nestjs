import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { CommonUserDTO, UpdateUserDTO } from '@/modules/user/dto';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminUserCountDTO } from './dto';
import { AdminFindUserQuery } from './dto/query';
import { AdminUserService } from './user.service';

@ApiTags('[관리자] 유저')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('users')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  @Get(':userId/detail')
  @ApiOperation({ description: '유저 상세 조회', summary: '유저 상세 조회 API' })
  @ResponseApi({
    type: CommonUserDTO,
  })
  async findUser(@Param('userId') userId: string) {
    return await this.userService.findUser(userId);
  }

  @Get()
  @ApiOperation({ summary: '유저 목록 조회 API', description: '유저 목록 조회' })
  @ResponseApi({
    type: CommonUserDTO,
    isPaging: true,
  })
  async findUsers(@Paging() paging: PagingDTO, @Query() query: AdminFindUserQuery) {
    return await this.userService.findUsers(paging, query);
  }

  @Get('count')
  @ApiOperation({ summary: '유저 카운트 API', description: '유저 카운트' })
  @ResponseApi({
    type: AdminUserCountDTO,
  })
  async countUsers() {
    return await this.userService.countUsers();
  }

  @Patch(':userId')
  @ApiOperation({ summary: '유저 수정 API', description: '유저 수정' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateUser(@Param('userId') userId: string, @Body() body: UpdateUserDTO) {
    return await this.userService.updateUser(userId, body);
  }

  @Delete(':userId')
  @ApiOperation({ summary: '유저 삭제 API', description: '유저 삭제' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
