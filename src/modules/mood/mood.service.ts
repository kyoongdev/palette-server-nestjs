import { Injectable } from '@nestjs/common';

import { MoodDTO } from './dto';
import { MoodRepository } from './mood.repository';

@Injectable()
export class MoodService {
  constructor(private readonly moodRepository: MoodRepository) {}

  async findMoods() {
    const moods = await this.moodRepository.findMoods({
      orderBy: {
        order: 'asc',
      },
    });

    return moods.map((mood) => new MoodDTO(mood));
  }
}
