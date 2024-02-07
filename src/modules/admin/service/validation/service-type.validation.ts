import { applyDecorators, mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/common/validators/base.validator';

export const SERVICE_TYPE = {
  ARTIST: 'ARTIST',
  MR_BEAT: 'MR_BEAT',
  RECORDING: 'RECORDING',
  MIX_MASTERING: 'MIX_MASTERING',
  ALBUM_ART: 'ALBUM_ART',
};

export type ServiceType = keyof typeof SERVICE_TYPE;
export const SERVICE_TYPE_VALUE = Object.keys(SERVICE_TYPE);

const ServiceTypeValidateConstraint = (nullable = false) => {
  @ValidatorConstraint()
  class ServiceTypeValidateConstraintImpl implements ValidatorConstraintInterface {
    validate(value: string | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
      if (nullable && !value) return true;

      if (!SERVICE_TYPE_VALUE.includes(value)) return false;
      return true;
    }
  }
  return mixin<ServiceTypeValidateConstraintImpl>(ServiceTypeValidateConstraintImpl);
};

export const ServiceTypeValidator = (nullable = false) =>
  BaseValidator(
    ServiceTypeValidateConstraint(nullable),
    '서비스 타입은 ARTIST, MR_BEAT, RECORDING, MIX_MASTERING, ALBUM_ART 중에만 입력해주세요.'
  );

export const ServiceTypeReqDecorator = (nullable = false) =>
  applyDecorators(
    ServiceTypeValidator(nullable),
    ApiProperty({
      description: '서비스 타입',
      example: 'ARTIST',
      enum: SERVICE_TYPE_VALUE,
      nullable,
      required: !nullable,
    })
  );
