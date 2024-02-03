import { Injectable } from '@nestjs/common';

import { AlbumArtRepository } from './album-art.repository';

@Injectable()
export class AlbumArtService {
  constructor(private readonly albumArtRepository: AlbumArtRepository) {}
}
