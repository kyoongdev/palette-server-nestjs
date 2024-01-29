import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class ContactRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findContacts() {
    const contacts = await this.database.getRepository().contact.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return contacts;
  }
}
