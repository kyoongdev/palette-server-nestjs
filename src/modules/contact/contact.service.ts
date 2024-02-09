import { Injectable } from '@nestjs/common';

import { ContactRepository } from './contact.repository';
import { ContactDTO } from './dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async findContacts() {
    const contacts = await this.contactRepository.findContacts({
      orderBy: {
        order: 'asc',
      },
    });
    return contacts.map((contact) => new ContactDTO(contact));
  }
}
