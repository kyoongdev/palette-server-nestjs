import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { JwtProvider } from '@/common/jwt/jwt';
import { Role, TokenPayload } from '@/interface/token.interface';
import { EncryptProvider } from '@/utils/encrypt';
import { validatePassword } from '@/utils/regex';

import { USER_ERROR_CODE } from '../user/exception/error-code';
import { UserRepository } from '../user/user.repository';

import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
import { AUTH_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: EncryptProvider,
    private readonly jwt: JwtProvider
  ) {}

  async login(data: LoginDTO) {
    const user = await this.userRepository.checkUserByEmail(data.email);
    if (!user) {
      throw new CustomException(USER_ERROR_CODE.USER_NOT_FOUND);
    }
    const password = await this.userRepository.findUserPassword(user.id);

    const isMatch = this.encrypt.comparePassword(data.password, password);

    if (!isMatch) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    return this.jwt.createTokens({
      id: user.id,
      role: Role.USER,
    });
  }

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
