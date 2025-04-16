import {
  PipeTransform,
  Injectable,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { TFilterNestedKeysOfType } from '../types/filter.types';

// there are multiple types of operators, operators that take a value, operators that a single condition, and operators that take an array of conditions
// let's seperate them into 3 groups
const valueOperators = [
  // operators that take a value, exemple: { age: { $gt: 18 } }
  '$eq',
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$in',
  '$nin',
];
const singleConditionOperators = ['$not']; // operators that take a single condition, exemple: { $not: { age: { $gt: 18 } } }
const arrayConditionOperators = ['$and', '$or', '$nor']; // operators that take an array of conditions, exemple: { $and: [{ age: { $gt: 18 } }, { name: 'John' }] }

@Injectable()
//TODO: this pipe is not working as expected for arrays of depth > 3, that mans when we have $and inside $or inside $and (or vice versa) and that is because the @query decorator is not parsing the query correctly for deep nested arrays. For now, it's not a problem because we are not using deep nested arrays in our queries.
export class SearchFilterPipe<T>
  implements PipeTransform<FilterQuery<T>, FilterQuery<T>>
{
  constructor(
    private readonly porps: {
      allowedFields: TFilterNestedKeysOfType<T, string | string[]>[];
    },
  ) {}

  transform(value: any): any {
    if (!value || typeof value.where !== 'object') {
      return {};
    }
    const { where } = value;
    const messages = this.validateFilter(where);

    if (messages.length > 0) {
      throw new BadRequestException(messages);
    }

    return where;
  }

  private isOperator(key: string): boolean {
    return key.startsWith('$');
  }

  private validateFilter(where: any, parentKey: string = ''): string[] {
    const messages: string[] = [];

    for (const key in where) {
      if (key.includes('[')) {
        //TODO: to remove after fixing the @query decorator
        throw new NotImplementedException(
          'deep nested arrays are not supported, please contact the api team if this error occurs',
        );
      }
      if (!this.isOperator(key)) {
        if (!this.porps.allowedFields.includes(key as any)) {
          messages.push(`Field '${key}' is not allowed.`);
        }

        if (typeof where[key] === 'object' && !Array.isArray(where[key])) {
          messages.push(...this.validateFilter(where[key], key));
        }
        continue;
      }
      if (arrayConditionOperators.includes(key)) {
        if (!Array.isArray(where[key])) {
          if (Object.keys(where[key])[0].includes('[')) {
            //TODO: to remove after fixing the @query decorator
            throw new NotImplementedException(
              'deep nested arrays are not supported, please contact the api team if this error occurs',
            );
          }
          messages.push(`The value of '${key}' must be an array.`);
          continue;
        }
        for (const condition of where[key]) {
          messages.push(...this.validateFilter(condition, parentKey));
        }
        continue;
      }
      if (singleConditionOperators.includes(key)) {
        if (typeof where[key] !== 'object' || Array.isArray(where[key])) {
          messages.push(`The value of '${key}' must be an object.`);
        } else {
          messages.push(...this.validateFilter(where[key], parentKey));
        }
        continue;
      }
      if (!valueOperators.includes(key)) {
        messages.push(`Operator '${key}' is not allowed.`);
      }
    }
    return messages;
  }
}
