import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import type { Response as ResponseType } from 'express';
import { nanoid } from 'nanoid';

import { GoogleLogin } from '@/utils/social/google';
import { KakaoLogin } from '@/utils/social/kakao';
import { NaverLogin } from '@/utils/social/naver';
import { ResponseApi } from '@/utils/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kakaoService: KakaoLogin,
    private readonly googleService: GoogleLogin,
    private readonly naverService: NaverLogin
  ) {}

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

  @Get('social/kakao')
  @ApiOperation({
    description: '카카오 로그인',
    summary: '카카오 로그인',
  })
  @ResponseApi({})
  kakaoLogin(@Response() res: ResponseType) {
    this.kakaoService.getRest(res);
  }

  @Get('social/kakao/callback')
  @ResponseApi({})
  async kakaoLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.kakaoLoginCallback(code, res);
  }

  @Get('social/naver')
  @ApiOperation({
    description: '네이버 로그인',
    summary: '네이버 로그인',
  })
  @ResponseApi({})
  naverLogin(@Response() res: ResponseType) {
    const code = nanoid(5);
    this.naverService.getRest(res, code);
  }

  @Get('social/naver/callback')
  @ResponseApi({})
  async naverLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.naverLoginCallback(code, res);
  }

  @Get('social/google')
  @ApiOperation({
    description: '구글 로그인',
    summary: '구글 로그인',
  })
  @ResponseApi({})
  googleLogin(@Response() res: ResponseType) {
    this.googleService.getRest(res);
  }

  @Get('social/google/callback')
  @ResponseApi({})
  async googleLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.googleLoginCallback(code, res);
  }
}
