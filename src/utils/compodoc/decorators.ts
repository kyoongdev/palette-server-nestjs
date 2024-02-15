import { applyDecorators, SetMetadata } from '@nestjs/common';

import type { CompodocBodyProps, CompodocOperationProps, CompodocResponseProps } from '@/interface/compodoc.interface';

export const COMPO_DOC = Symbol('COMPO_DOC');
export const COMPO_DOC_BODY = Symbol('COMPO_DOC_BODY');
export const COMPO_DOC_RESPONSE = Symbol('COMPO_DOC_RESPONSE');
export const COMPO_DOC_OPERATION = Symbol('COMPO_DOC_OPERATION');

export const COMPO_DOC_DTO = Symbol('COMPO_DOC_DTO');
export const COMPO_DOC_PROPERTY = Symbol('COMPO_DOC_PROPERTY');
export const COMPO_DOC_PROPERTIES = Symbol('COMPO_DOC_PROPERTIES');

export const ApplyCompodoc = (title: string) => applyDecorators(SetMetadata(COMPO_DOC, title));

export const CompodocBody = (data: CompodocBodyProps) => {
  return applyDecorators(SetMetadata(COMPO_DOC_BODY, data));
};

export const CompodocResponse = (data: CompodocResponseProps) => {
  return applyDecorators(SetMetadata(COMPO_DOC_RESPONSE, data));
};

export const CompodocOperation = (data: CompodocOperationProps) => {
  return applyDecorators(SetMetadata(COMPO_DOC_OPERATION, data));
};

export const CompodocDTO = (description?: string) => {
  return applyDecorators(SetMetadata(COMPO_DOC_DTO, description));
};

export const CompodocProperty = (data: CompodocBodyProps) => {
  return applyDecorators(SetMetadata(COMPO_DOC_PROPERTY, data));
};
