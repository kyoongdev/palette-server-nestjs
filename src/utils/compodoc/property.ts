import { CompodocProperty } from '@/interface/compodoc.interface';

import { ApiProperty } from '../swagger/property-type';

import { COMPO_DOC_PROPERTIES } from './decorators';

export const createCompodocPropertyDecorator = <T extends ApiProperty>(
  metadata: T,
  target: object,
  propertyKey: string
) => {
  const properties: CompodocProperty[] = Reflect.getMetadata(COMPO_DOC_PROPERTIES, target) || [];

  if (!properties.map((property) => property.name).includes(propertyKey)) {
    Reflect.defineMetadata(
      COMPO_DOC_PROPERTIES,
      [
        ...properties,
        {
          ...metadata,
          name: propertyKey,
        },
      ],
      target
    );
  }
};
