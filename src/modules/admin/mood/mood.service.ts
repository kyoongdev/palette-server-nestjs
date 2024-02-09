import { Injectable } from '@nestjs/common';

import { CreateMoodDTO, UpdateMoodDTO } from '@/modules/mood/dto';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminMoodDTO } from './dto';

@Injectable()
export class AdminMoodService {
  constructor(private readonly moodRepository: MoodRepository) {}

  async findMood(id: string) {
    const mood = await this.moodRepository.findMood(id);
    return new AdminMoodDTO(mood);
  }

  async findMoods(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.moodRepository.countMoods();
    const moods = await this.moodRepository.findMoods({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });
    return new PaginationDTO(
      moods.map((mood) => new AdminMoodDTO(mood)),
      { paging, count }
    );
  }

  @Transactional()
  async createMood(data: CreateMoodDTO) {
    const mood = await this.moodRepository.createMood(data);
    return mood.id;
  }

  @Transactional()
  async updateMood(id: string, data: UpdateMoodDTO) {
    await this.moodRepository.findMood(id);
    await this.moodRepository.updateMood(id, data);
  }

  @Transactional()
  async deleteMood(id: string) {
    await this.moodRepository.findMood(id);
    await this.moodRepository.deleteMood(id);
  }
}
