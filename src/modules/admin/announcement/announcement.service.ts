import { Injectable } from '@nestjs/common';

import { AnnouncementRepository } from '@/modules/announcement/announcement.repository';
import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '@/modules/announcement/dto';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

@Injectable()
export class AdminAnnouncementService {
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

  async createAnnouncement(data: CreateAnnouncementDTO) {
    const announcement = await this.announcementRepository.createAnnouncement(data);
    return announcement.id;
  }

  async updateAnnouncement(id: string, data: UpdateAnnouncementDTO) {
    await this.announcementRepository.findAnnouncement(id);
    await this.announcementRepository.updateAnnouncement(id, data);
  }

  async deleteAnnouncement(id: string) {
    await this.announcementRepository.findAnnouncement(id);
    await this.announcementRepository.deleteAnnouncement(id);
  }
}
