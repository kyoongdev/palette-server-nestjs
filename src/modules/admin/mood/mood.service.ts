import { Injectable } from '@nestjs/common';

import { MoodRepository } from '@/modules/mood/mood.repository';

@Injectable()
export class AdminMoodService {
  constructor(private readonly moodRepository: MoodRepository) {}
}
