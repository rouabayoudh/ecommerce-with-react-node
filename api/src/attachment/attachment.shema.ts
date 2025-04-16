import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

@Schema()
export class Attachment extends BaseSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  size: number;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);

applyBaseSchemaHooks(AttachmentSchema);
