import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ description: '로그인', summary: '로그인 API' })
  @ApiBody({
    type: LoginDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @Post('/refresh')
  @ApiOperation({ description: '토큰 재발급', summary: '토큰 재발급 API' })
  @ApiBody({
    type: TokenDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async refresh(@Body() body: TokenDTO) {
    return await this.authService.refresh(body);
  }

  @Post('/register')
  @ApiOperation({ description: '회원가입', summary: '회원가입 API' })
  @ApiBody({
    type: RegisterDTO,
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }
}
