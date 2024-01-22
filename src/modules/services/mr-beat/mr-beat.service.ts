import { Injectable } from '@nestjs/common';

import { MrBeatRepository } from './mr-beat.repository';

@Injectable()
export class MrBeatService {
  constructor(private readonly mrBeatRepository: MrBeatRepository) {}
}
