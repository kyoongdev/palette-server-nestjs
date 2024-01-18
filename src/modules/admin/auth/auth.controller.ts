import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TokenDTO } from '@/modules/auth/dto';
import { ResponseApi } from '@/utils/swagger';

import { AdminAuthService } from './auth.service';
import { AdminLoginDTO } from './dto';
import { AdminRegisterDTO } from './dto/register.dto';

@ApiTags('[관리자] 관리자 인증')
@Controller('/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('/login')
  @ApiOperation({ description: '관리자 로그인', summary: '관리자 로그인 API' })
  @ApiBody({
    type: AdminLoginDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async login(@Body() body: AdminLoginDTO) {
    return await this.authService.login(body);
  }

  @Post('/register')
  @ApiOperation({ description: '관리자 회원가입', summary: '관리자 회원가입 API' })
  @ApiBody({
    type: AdminRegisterDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async register(@Body() body: AdminRegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('/refresh')
  @ApiOperation({ description: '관리자 토큰 리프래시', summary: '관리자 토큰 리프래시 API' })
  @ApiBody({
    type: TokenDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async refresh(@Body() body: TokenDTO) {
    return await this.authService.refresh(body);
  }
}
