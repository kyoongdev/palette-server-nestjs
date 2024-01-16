import type { Type } from '@nestjs/common';
import type {
  ReferenceObject,
  ResponseObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiResponseMetadata extends Omit<ResponseObject, 'description'> {
  status?: number | 'default';
  type?: Type<unknown> | Function | [Function] | string;
  isArray?: boolean;
  description?: string;
}

export interface ApiResponseSchemaHost extends Omit<ResponseObject, 'description'> {
  schema: SchemaObject & Partial<ReferenceObject>;
  status?: number;
  description?: string;
}

export type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;
