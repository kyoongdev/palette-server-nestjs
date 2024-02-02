import { Injectable } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';

import { MixMasteringRepository } from './mix-mastering.repository';

@Injectable()
export class MixMasteringService {
  constructor(
    private readonly mixMasteringRepository: MixMasteringRepository,
    private readonly fileRepository: FileRepository,
    private readonly genreRepository: GenreRepository,
    private readonly contactRepository: ContactRepository,
    private readonly licenseRepository: LicenseRepository
  ) {}
}
