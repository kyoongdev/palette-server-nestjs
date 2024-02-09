import { Injectable } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { CreateContactDTO, UpdateContactDTO } from '@/modules/contact/dto';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminContactDTO } from './dto';

@Injectable()
export class AdminContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async findContact(id: string) {
    const contact = await this.contactRepository.findContact(id);
    return new AdminContactDTO(contact);
  }

  async findContacts(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.contactRepository.countContact();
    const contacts = await this.contactRepository.findContacts({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      contacts.map((contact) => new AdminContactDTO(contact)),
      { paging, count }
    );
  }

  @Transactional()
  async createContact(data: CreateContactDTO) {
    const contact = await this.contactRepository.createContact(data);
    return contact.id;
  }

  @Transactional()
  async updateContact(id: string, data: UpdateContactDTO) {
    await this.contactRepository.findContact(id);
    await this.contactRepository.updateContact(id, data);
  }

  @Transactional()
  async deleteContact(id: string) {
    await this.contactRepository.findContact(id);
    await this.contactRepository.deleteContact(id);
  }
}
