import { Injectable } from '@nestjs/common';

import { MoodRepository } from './mood.repository';

@Injectable()
export class MoodService {
  constructor(private readonly moodRepository: MoodRepository) {}

  async findMoods() {
    return await this.moodRepository.findMoods();
  }
}
