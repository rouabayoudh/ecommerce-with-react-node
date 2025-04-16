import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/Base.schema';
import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';

@Schema()
export class Role extends BaseSchema {
  @Prop({ required: true, type: String, unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

applyBaseSchemaHooks(RoleSchema);
