import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

@Schema()
export class AppEntity extends BaseSchema {
  @Prop({ required: true, type: String, unique: true })
  name: string;
}

export const AppEntitySchema = SchemaFactory.createForClass(AppEntity);

applyBaseSchemaHooks(AppEntitySchema);
