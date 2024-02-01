import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RecordingService } from './recording.service';

@ApiTags('레코딩')
@Controller('recordings')
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}
}
