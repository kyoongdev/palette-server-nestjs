import { Type } from '@nestjs/common';

export interface CompodocBody {
  type?: Type<unknown> | Function | [Function] | string;
}

export interface CompodocResponse {
  type?: Type<unknown> | Function | [Function] | string;
}
