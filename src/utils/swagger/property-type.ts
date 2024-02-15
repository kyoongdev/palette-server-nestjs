import type { ApiPropertyOptions } from '@nestjs/swagger';

import type { TypeOptions } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';

export interface ApiProperty extends ApiPropertyOptions {
  isCompodoc?: boolean;
}

export interface Property {
  apiProperty?: ApiProperty;
  validation?: ValidationOptions;
  overrideExisting?: boolean;
  typeOptions?: TypeOptions;
}
