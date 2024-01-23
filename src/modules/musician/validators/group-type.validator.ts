import { applyDecorators, mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

import { Property } from '@/utils/swagger';

import { BaseValidator } from '../../../common/validators/base.validator';

export const GROUP_TYPE = {
  ALONE: 'ALONE',
  MANY: 'MANY',
} as const;

export enum GROUP_TYPE_ENUM {
  ALONE = 1,
  MANY,
}

export const GROUP_TYPE_VALUE = Object.keys(GROUP_TYPE);

const GroupTypeValidateConstraint = (nullable = false) => {
  @ValidatorConstraint()
  class GroupTypeValidateConstraintImpl implements ValidatorConstraintInterface {
    validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
      if (nullable && !value) return true;

      if (value !== GROUP_TYPE_ENUM.ALONE && value !== GROUP_TYPE_ENUM.MANY) return false;
      return true;
    }
  }
  return mixin<GroupTypeValidateConstraintImpl>(GroupTypeValidateConstraintImpl);
};

export const GroupTypeValidator = (nullable = false) =>
  BaseValidator(GroupTypeValidateConstraint(nullable), '활동 인원은 ALONE과 MANY 중에만 입력해주세요.');

export const groupTypeNumberToString = (groupType: number) => {
  if (groupType === GROUP_TYPE_ENUM.ALONE) {
    return GROUP_TYPE.ALONE;
  } else if (groupType === GROUP_TYPE_ENUM.MANY) {
    return GROUP_TYPE.MANY;
  } else {
    return null;
  }
};

export const groupTypeStringToNumber = (groupType: string) => {
  if (groupType === GROUP_TYPE.ALONE) {
    return GROUP_TYPE_ENUM.ALONE;
  } else if (groupType === GROUP_TYPE.MANY) {
    return GROUP_TYPE_ENUM.MANY;
  } else {
    return null;
  }
};

export const GroupTypeReqTransform = () => Transform(({ value }) => groupTypeStringToNumber(value));
export const GroupTypeResTransform = () => Transform(({ value }) => groupTypeNumberToString(value));

export const GroupTypeReqDecorator = (nullable = false) =>
  applyDecorators(
    GroupTypeReqTransform(),
    GroupTypeValidator(nullable)(),
    Property({
      apiProperty: {
        nullable,
        description: '활동 인원',
        type: 'number',
        example: GROUP_TYPE_VALUE.join(' | '),
      },
    })
  );

export const GroupTypeResDecorator = (nullable = false) =>
  applyDecorators(
    GroupTypeResTransform(),
    Property({
      apiProperty: {
        nullable,
        description: '활동 인원',
        type: 'string',
        enum: GROUP_TYPE_VALUE,
        example: GROUP_TYPE_VALUE.join(' | '),
      },
    })
  );
