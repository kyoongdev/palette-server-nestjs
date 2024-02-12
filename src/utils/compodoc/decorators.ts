import { applyDecorators, SetMetadata } from '@nestjs/common';

import type { CompodocBody, CompodocResponse } from '@/interface/compodoc.interface';

export const COMPO_DOC = Symbol('COMPO_DOC');
export const COMPO_DOC_BODY = Symbol('COMPO_DOC_BODY');
export const COMPO_DOC_RESPONSE = Symbol('COMPO_DOC_RESPONSE');

export const ApplyCommonDoc = (title: string) => applyDecorators(SetMetadata(COMPO_DOC, title));

export const CommonDocBody = (data: CompodocBody) => {
  return applyDecorators(SetMetadata(COMPO_DOC_BODY, data));
};

export const CommonDocResponse = (data: CompodocResponse) => {
  return applyDecorators(SetMetadata(COMPO_DOC_RESPONSE, data));
};
