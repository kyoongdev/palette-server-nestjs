import { Controller, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { PagingDTO } from '@/utils/pagination';
import { ResponseApi } from '@/utils/swagger';

import { CommonUserDTO } from './dto';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({
    type: PagingDTO,
  })
  @ResponseApi({
    type: CommonUserDTO,
    isPaging: true,
  })
  async findUsers(@Paging() paging: PagingDTO) {
    return await this.userService.findUsers(paging);
  }
}
