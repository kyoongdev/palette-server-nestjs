import { Injectable } from '@nestjs/common';

import { RegionRepository } from '@/modules/region/region.repository';

@Injectable()
export class AdminRegionService {
  constructor(private readonly regionRepository: RegionRepository) {}
}
