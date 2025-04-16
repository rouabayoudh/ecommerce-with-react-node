import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { AppEntity } from '../schemas/AppEntity.schema';

@Injectable()
export class AppEntityService extends BaseService<AppEntity> {
  constructor(
    @InjectModel(AppEntity.name)
    private readonly appEntityModel: Model<AppEntity>,
  ) {
    super(appEntityModel, AppEntity);
  }
}
