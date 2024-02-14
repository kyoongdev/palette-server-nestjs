import { Type } from '@nestjs/common';

export interface CompodocBody {
  type?: Type<unknown> | Function | [Function] | string;
}

export interface CompodocResponse {
  type?: Type<unknown> | Function | [Function] | string;
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
  items: any[];
}
