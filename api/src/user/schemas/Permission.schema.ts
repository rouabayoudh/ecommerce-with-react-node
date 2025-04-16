import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

import { AppEntity } from './AppEntity.schema';
import { Role } from './Role.schema';
import { ActionEnum } from '../enums/action.enum';

@Schema()
export class PermissionStub extends BaseSchema {
  @Prop({ required: true, enum: ActionEnum, type: String })
  action: ActionEnum;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
  })
  role: unknown;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: AppEntity.name,
  })
  entity: unknown;
}

export class Permission extends PermissionStub {
  role: string;

  entity: string;
}

export class PopulatedPermission extends PermissionStub {
  @Type(() => Role)
  role: Role;

  @Type(() => AppEntity)
  entity: AppEntity;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission).index(
  { action: 1, role: 1, entity: 1 },
  { unique: true },
);

applyBaseSchemaHooks(PermissionSchema);
