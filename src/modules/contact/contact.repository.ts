import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

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

  async createContact(data: Prisma.ContactCreateInput) {
    const contact = await this.database.getRepository().contact.create({
      data,
    });

    return contact;
  }

  async updateContact(id: string, data: Prisma.ContactUpdateInput) {
    await this.database.getRepository().contact.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteContact(id: string) {
    await this.database.getRepository().contact.delete({
      where: {
        id,
      },
    });
  }
}
