import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Response } from 'express';
import queryString from 'querystring';

import { CustomException } from '@/common/error/custom.exception';
import { JwtProvider } from '@/common/jwt/jwt';
import { Role, TokenPayload } from '@/interface/token.interface';
import { SocialType } from '@/interface/user.interface';
import { logger } from '@/log';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { EncryptProvider } from '@/utils/encrypt';
import { validatePassword } from '@/utils/regex';
import { GoogleLogin } from '@/utils/social/google';
import { KakaoLogin } from '@/utils/social/kakao';
import { NaverLogin } from '@/utils/social/naver';

import { UserDTO } from '../user/dto';
import { CreateSocialUserDTO } from '../user/dto/create-social-user.dto';
import { USER_ERROR_CODE } from '../user/exception/error-code';
import { UserRepository } from '../user/user.repository';

import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
import { AUTH_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: EncryptProvider,
    private readonly jwt: JwtProvider,
    private readonly configService: ConfigService,
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin,
    private readonly googleService: GoogleLogin
  ) {}

  @Transactional()
  async socialCallback(data: CreateSocialUserDTO, socialId: string, path: SocialType, token: string, res: Response) {
    let user = await this.userRepository.checkUserBySocialId(socialId);

    if (!user) {
      user = await this.userRepository.createSocialUser(data);
    }
    const realUser = UserDTO.fromEntity(user);

    const tokens = await this.jwt.createTokens({
      id: user.id,
      role: realUser.musician && realUser.musician.approveStatus === 'APPROVED' ? Role.MUSICIAN : Role.USER,
    });

    const query = queryString.stringify({
      status: 200,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      [`${path}Token`]: token,
    });

    res.redirect(`${this.configService.get('CLIENT_URL')}/auth/${path}?${query}`);
  }

  async kakaoLoginCallback(code: string, res: Response) {
    try {
      const result = await this.kakaoService.getRestCallback(code);

      const { user } = result;

      this.socialCallback(new CreateSocialUserDTO().setKakaoUser(user), `${user.id}`, 'kakao', result.token, res);
    } catch (err) {
      logger.log(err);
    }
  }

  async naverLoginCallback(code: string, res: Response) {
    try {
      const result = await this.naverService.getRestCallback(code);
      const { user } = result;

      this.socialCallback(new CreateSocialUserDTO().setNaverUser(user), `${user.id}`, 'naver', result.token, res);
    } catch (err) {
      logger.log(err);
    }
  }

  async googleLoginCallback(code: string, res: Response) {
    try {
      const result = await this.googleService.getRestCallback(code);

      const { user } = result;

      this.socialCallback(new CreateSocialUserDTO().setGoogleUser(user), `${user.id}`, 'google', result.token, res);
    } catch (err) {
      logger.log(err);
    }
  }

  async login(data: LoginDTO) {
    const user = await this.userRepository.checkUserByEmail(data.email);

    if (!user) {
      throw new CustomException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    if (!user.password) throw new CustomException(USER_ERROR_CODE.PASSWORD_NOT_EXIST);

    const isMatch = this.encrypt.comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    const realUser = UserDTO.fromEntity(user);

    return this.jwt.createTokens({
      id: user.id,
      role: realUser.musician && realUser.musician.approveStatus === 'APPROVED' ? Role.MUSICIAN : Role.USER,
    });
  }

  @Transactional()
  async register(data: RegisterDTO) {
    const user = await this.userRepository.checkUserByEmail(data.email);

    if (user) {
      throw new CustomException(USER_ERROR_CODE.USER_ALREADY_EXIST);
    }

    if (!validatePassword(data.password)) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_FORMAT_ERROR);
    }

    const password = this.encrypt.hashPassword(data.password);

    const newUser = await this.userRepository.createUser({
      ...data,
      password,
    });

    return this.jwt.createTokens({
      id: newUser.id,
      role: Role.USER,
    });
  }

  async refresh(data: TokenDTO) {
    const { accessToken, refreshToken } = data;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    }) as TokenPayload | null | undefined;
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken) as TokenPayload | null | undefined;

    if (!accessTokenPayload) throw new CustomException(AUTH_ERROR_CODE.WRONG_ACCESS_TOKEN);
    if (!refreshTokenPayload) throw new CustomException(AUTH_ERROR_CODE.WRONG_REFRESH_TOKEN);

    if (accessTokenPayload.key !== refreshTokenPayload.key) throw new CustomException(AUTH_ERROR_CODE.WRONG_KEY);
    if (accessTokenPayload.id !== refreshTokenPayload.id) throw new CustomException(AUTH_ERROR_CODE.WRONG_ID);

    return this.jwt.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }
}
