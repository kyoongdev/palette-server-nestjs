import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { IMAGE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class FileRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findImage(id: string) {
    const image = await this.database.getRepository().image.findUnique({
      where: {
        id,
      },
    });

    if (!image) throw new CustomException(IMAGE_ERROR_CODE.IMAGE_NOT_FOUND);

    return image;
  }
}
