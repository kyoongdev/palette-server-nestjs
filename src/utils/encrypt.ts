import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import crypto from 'crypto';

import { CommonException } from './exception/common.exception';
import { COMMON_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class EncryptProvider {
  constructor(private readonly configService: ConfigService) {}

  public comparePassword(password: string, hashedPassword: string, salt = this.configService.get('PASSWORD_SALT')) {
    try {
      return this.hashPassword(password, salt) === hashedPassword;
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }

  public hashPassword(password: string, salt = this.configService.get('PASSWORD_SALT')) {
    try {
      return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }

  public createSalt() {
    try {
      return crypto.randomBytes(32).toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }
}
