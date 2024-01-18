import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

import { MoodDTO } from './dto';

@Injectable()
export class MoodRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMoods() {
    const moods = await this.database.getRepository().mood.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return moods.map((mood) => new MoodDTO(mood));
  }
}
