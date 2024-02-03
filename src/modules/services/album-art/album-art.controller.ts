import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlbumArtService } from './album-art.service';

@ApiTags('앨범 아트')
@Controller('album-arts')
export class AlbumArtController {
  constructor(private readonly albumArtService: AlbumArtService) {}
}
