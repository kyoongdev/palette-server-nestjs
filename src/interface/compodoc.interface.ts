import { Type } from '@nestjs/common';

import { ApiProperty } from '@/utils/swagger/property-type';

export interface CompodocBodyProps {
  type: Type<unknown> | Function | [Function] | string;
}

export interface CompodocResponseProps {
  type: Type<unknown> | Function | [Function] | string;
}

export interface CompodocOperationProps {
  description: string;
}

export interface CompodocFieldValue {
  description?: string;
  type: string;
  nullable?: boolean;
  name: string;
}

export interface CompodocItem {
  title: string;
  description?: string;
  body: CompodocFieldValue[];
  response: CompodocFieldValue[];
}

export interface CompodocMarkDown {
  title: string;
  items: CompodocItem[];
}

export interface CompodocProperty extends ApiProperty {
  name: string;
}
