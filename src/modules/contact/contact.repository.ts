import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CONTACT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ContactRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findContact(id: string) {
    const contact = await this.database.getRepository().contact.findUnique({
      where: {
        id,
      },
    });

    if (!contact) {
      throw new CustomException(CONTACT_ERROR_CODE.CONTACT_NOT_FOUND);
    }

    return contact;
  }

  async findContacts() {
    const contacts = await this.database.getRepository().contact.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return contacts;
  }
}
