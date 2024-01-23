import { Injectable } from '@nestjs/common';

import { MrBeatRepository } from './mr-beat.repository';

@Injectable()
export class MrBeatService {
  constructor(private readonly mrBeatRepository: MrBeatRepository) {}

  async findMrBeat(id: string) {}

  async findMrBeats() {}

  async createMrBeat() {}

  async updateMrBeat() {}

  async deleteMrBeat() {}
}
