import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MixMasteringService } from './mix-mastering.service';

@ApiTags('믹스 마스터링')
@Controller('mix-masterings')
export class MixMasteringController {
  constructor(private readonly mixMasteringService: MixMasteringService) {}
}
