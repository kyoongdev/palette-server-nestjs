import { Injectable } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';

@Injectable()
export class AdminContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async findContact(id: string) {
    const contact = await this.contactRepository.findContact(id);
    return contact;
  }
}
