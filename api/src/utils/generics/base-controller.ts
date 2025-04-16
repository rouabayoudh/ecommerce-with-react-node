import { NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { BaseSchema } from './Base.schema';
import { BaseService } from './base.service';
import { HttpResponse } from '../types/http-reponse.types';

export abstract class BaseController<T extends BaseSchema> {
  constructor(private readonly service: BaseService<T>) {}

  protected validate({
    dto,
    allowedIds,
  }: {
    dto: Partial<T>;
    allowedIds: Partial<T>;
  }) {
    const exceptions = [];
    Object.entries(dto)
      .filter(([key]) => Object.keys(allowedIds).includes(key))
      .forEach(([field]) => {
        const invalidIds = (
          Array.isArray(dto[field]) ? dto[field] : [dto[field]]
        ).filter(
          (id) =>
            !(
              Array.isArray(allowedIds[field])
                ? allowedIds[field]
                : [allowedIds[field]]
            ).includes(id),
        );

        if (invalidIds.length) {
          exceptions.push(
            `${field} with ID${
              invalidIds.length > 1 ? 's' : ''
            } '${invalidIds}' not found`,
          );
        }
      });

    if (exceptions.length) throw new NotFoundException(exceptions);
  }

  async count(filters?: FilterQuery<T>) {
    return new HttpResponse(undefined, {
      count: await this.service.count(filters),
    });
  }
}
