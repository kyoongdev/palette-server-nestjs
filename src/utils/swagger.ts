import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { isArray, omit } from 'lodash';

import type { ApiResponseMetadata, ApiResponseOptions } from '@/interface/swagger.interface';

import { DECORATORS } from './constants/swagger';

export function getTypeIsArrayTuple(
  input: Function | [Function] | undefined | string | Record<string, any>,
  isArrayFlag?: boolean
): [Function | undefined, boolean] {
  if (!input) {
    return [input as undefined, isArrayFlag ?? false];
  }
  if (isArrayFlag) {
    return [input as Function, isArrayFlag];
  }
  const isInputArray = isArray(input);
  const type = isInputArray ? input[0] : input;
  return [type as Function, isInputArray];
}

export const ResponseApi = (
  options: ApiResponseOptions & { isPaging?: boolean },
  code = 200 as HttpStatus
): MethodDecorator & ClassDecorator => {
  const [type, isArray] = getTypeIsArrayTuple(
    (options as ApiResponseMetadata).type,
    (options as ApiResponseMetadata).isArray
  );

  if (options.isPaging && !!type) {
    (options as ApiResponseMetadata).type = type;
    (options as ApiResponseMetadata).isArray = isArray;
    options.description = options.description ? options.description : '';

    const groupedMetadata = {
      [options.status || 'default']: omit(options, 'status'),
    };
    return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
      if (descriptor) {
        const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, descriptor.value) || {};

        Reflect.defineMetadata(
          DECORATORS.API_RESPONSE,
          {
            ...responses,
            ...groupedMetadata,
          },
          descriptor.value
        );

        ApiExtraModels(type)(target, key, descriptor);

        return ResponseApi({
          schema: {
            properties: {
              paging: {
                type: 'object',
                properties: {
                  total: {
                    type: 'number',
                  },
                  page: {
                    type: 'number',
                  },
                  limit: {
                    type: 'number',
                  },
                  skip: {
                    type: 'number',
                  },
                  hasPrev: {
                    type: 'boolean',
                  },
                  hasNext: {
                    type: 'boolean',
                  },
                },
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(type as Function) },
              },
            },
          },
        })(target, key as string | symbol, descriptor);
      }
    };
  }

  return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
    if (descriptor) {
      HttpCode(code)(target, key as any, descriptor);
      ApiResponse(options)(target, key as any, descriptor);
    }
  };
};
