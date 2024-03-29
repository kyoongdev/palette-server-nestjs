import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { RequestUser } from '@/interface/token.interface';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import {
  CheckEmailDTO,
  CheckEmailResultDTO,
  CheckNicknameDTO,
  CheckNicknameResultDTO,
  CommonUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from './dto';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @Auth([JwtAuthGuard, RoleGuard('USER', 'MUSICIAN')])
  @ApiOperation({ description: '내 정보 조회', summary: '내 정보 조회 API' })
  @ResponseApi({
    type: CommonUserDTO,
  })
  async findMe(@ReqUser() user: RequestUser) {
    return await this.userService.findCommonUser(user.id);
  }

  @Post('/check-email')
  @ApiOperation({ description: '이메일 중복 확인', summary: '이메일 중복 확인 API' })
  @ApiBody({
    type: CheckEmailDTO,
  })
  @ResponseApi({
    type: CheckEmailResultDTO,
  })
  async checkEmail(@Body() body: CheckEmailDTO) {
    return await this.userService.checkEmail(body);
  }

  @Post('/check-nickname')
  @ApiOperation({ description: '닉네임 중복 확인', summary: '닉네임 중복 확인 API' })
  @ApiBody({
    type: CheckNicknameDTO,
  })
  @ResponseApi({
    type: CheckNicknameResultDTO,
  })
  async checkNickname(@Body() body: CheckNicknameDTO) {
    return await this.userService.checkNickname(body);
  }

  @Patch('/me')
  @Auth([JwtAuthGuard, RoleGuard('USER', 'MUSICIAN')])
  @ApiOperation({ description: '내 정보 수정', summary: '내 정보 수정 API' })
  @ApiBody({
    type: UpdateUserDTO,
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMe(@ReqUser() user: RequestUser, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(user.id, body);
  }

  @Patch('/me/password')
  @Auth([JwtAuthGuard, RoleGuard('USER', 'MUSICIAN')])
  @ApiOperation({ description: '내 비밀번호 수정', summary: '내 비밀번호 수정 API' })
  @ApiBody({
    type: UpdatePasswordDTO,
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMyPassword(@ReqUser() user: RequestUser, @Body() body: UpdatePasswordDTO) {
    await this.userService.updatePassword(user.id, body);
  }

  @Delete('/me')
  @Auth([JwtAuthGuard, RoleGuard('USER', 'MUSICIAN')])
  @ApiOperation({ description: '내 정보 삭제', summary: '내 정보 삭제 API - 복구 가능' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMe(@ReqUser() user: RequestUser) {
    await this.userService.deleteUser(user.id);
  }
}
