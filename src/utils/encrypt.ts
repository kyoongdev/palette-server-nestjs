import crypto from 'crypto';
import { has } from 'lodash';

import { CommonException } from './exception/common.exception';
import { COMMON_ERROR_CODE } from './exception/errorCode';

const comparePassword = (salt: string, password: string, hashedPassword: string) => {
  try {
    return hashPassword(salt, password) === hashedPassword;
  } catch (err) {
    throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
  }
};

const hashPassword = (salt: string, password: string) => {
  try {
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
  } catch (err) {
    throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
  }
};

const createSalt = () => {
  try {
    return crypto.randomBytes(32).toString('base64');
  } catch (err) {
    throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
  }
};

export { comparePassword, createSalt, has };
