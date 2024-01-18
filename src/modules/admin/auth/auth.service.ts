import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { JwtProvider } from '@/common/jwt/jwt';
import { Role, TokenPayload } from '@/interface/token.interface';
import { TokenDTO } from '@/modules/auth/dto';
import { AUTH_ERROR_CODE } from '@/modules/auth/exception/error-code';
import { EncryptProvider } from '@/utils/encrypt';
import { validatePassword } from '@/utils/regex';

import { AdminRepository } from '../admin.repository';
import { ADMIN_ERROR_CODE } from '../exception/error-code';

import { AdminLoginDTO } from './dto';
import { AdminRegisterDTO } from './dto/register.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly encrypt: EncryptProvider,
    private readonly jwt: JwtProvider
  ) {}
  async login(data: AdminLoginDTO) {
    const admin = await this.adminRepository.checkAdminByAdminId(data.adminId);
    if (!admin) {
      throw new CustomException(ADMIN_ERROR_CODE.ADMIN_NOT_FOUND);
    }
    const userPassword = await this.adminRepository.findAdmin(admin.id);

    if (!userPassword) throw new CustomException(ADMIN_ERROR_CODE.PASSWORD_NOT_EXIST);

    const isMatch = this.encrypt.comparePassword(data.password, userPassword.password);

    if (!isMatch) {
      throw new CustomException(ADMIN_ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    return this.jwt.createTokens({
      id: admin.id,
      role: Role.ADMIN,
    });
  }

  async register(data: AdminRegisterDTO) {
    const user = await this.adminRepository.checkAdminByAdminId(data.adminId);

    if (user) {
      throw new CustomException(ADMIN_ERROR_CODE.ADMIN_ALREADY_EXIST);
    }

    if (!validatePassword(data.password)) {
      throw new CustomException(ADMIN_ERROR_CODE.PASSWORD_FORMAT_ERROR);
    }

    const password = this.encrypt.hashPassword(data.password);

    const newUser = await this.adminRepository.createAdmin({
      ...data,
      password,
    });

    return this.jwt.createTokens({
      id: newUser.id,
      role: Role.ADMIN,
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
    if (
      accessTokenPayload.role !== refreshTokenPayload.role ||
      accessTokenPayload.role !== 'ADMIN' ||
      refreshTokenPayload.role !== 'ADMIN'
    )
      throw new CustomException(AUTH_ERROR_CODE.WRONG_ROLE);
    return this.jwt.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }
}
