import { AppEntityService } from '@/user/services/app-entity.service';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable, Logger } from '@nestjs/common';
import { appEntitySeeds } from './appentity.seed-data';
import { AppEntity } from '@/user/schemas/AppEntity.schema';

@Injectable()
export class AppEntitySeeder extends BaseSeeder<AppEntity> {
  constructor(private readonly appEntityService: AppEntityService) {
    super(AppEntity.name, appEntityService);
  }

  async seed() {
    await this.seedData(appEntitySeeds);
  }
}
