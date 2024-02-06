import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { RegionRepository } from '@/modules/region/region.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';

import { ValidateServiceProvider } from './validate-service.provider';

const providers = [
  FileRepository,
  ContactRepository,
  LicenseRepository,
  SaleTypeRepository,
  GenreRepository,
  MoodRepository,
  RegionRepository,
  ValidateServiceProvider,
];

@Module({
  providers,
  exports: providers,
})
export class ValidateServiceModule {}
