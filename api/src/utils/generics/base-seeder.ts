import { UserService } from '@/user/services/user.service';
import { BaseService } from './base.service';
import { BaseSchema } from './Base.schema';
import { isEmpty } from 'class-validator';
import { Logger } from '@nestjs/common';

export class BaseSeeder<T> {
  constructor(
    private readonly entityName: string,
    private readonly baseService: BaseService<T>,
  ) {}

  async isEmpty(): Promise<boolean> {
    const entities = await this.baseService.findAll();
    return entities.length === 0;
  }

  async seedData<D extends Omit<T, keyof BaseSchema>>(
    data: D[],
  ): Promise<void> {
    if (await this.isEmpty()) {
      await this.baseService.createMany(data);
      Logger.log(`${this.entityName} seeded successfully`);
    } else {
      Logger.warn(`${this.entityName} already seeded`);
    }
  }
}
