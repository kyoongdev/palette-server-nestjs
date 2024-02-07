import { Injectable } from '@nestjs/common';

import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementDTO } from './dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly announcementRepository: AnnouncementRepository) {}

  async findAnnouncement(id: string) {
    const announcement = await this.announcementRepository.findAnnouncement(id);

    return new AnnouncementDTO(announcement);
  }

  async findAnnouncements(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const announcements = await this.announcementRepository.findAnnouncements({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.announcementRepository.countAnnouncements();

    return new PaginationDTO(
      announcements.map((announcement) => new AnnouncementDTO(announcement)),
      { count, paging }
    );
  }
}
