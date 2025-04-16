import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({ async: false })
export class IsMongoIdConstraint implements ValidatorConstraintInterface {
  validate(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  defaultMessage() {
    return 'Invalid MongoDB ObjectId';
  }
}

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoIdConstraint,
    });
  };
}
