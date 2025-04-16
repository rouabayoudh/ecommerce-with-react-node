import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

@Schema()
export class CategoryStub extends BaseSchema {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parentCategory?: unknown;
}

export class Category extends CategoryStub {
  parentCategory?: string;
}

export class PopulatedCategory extends CategoryStub {
  @Type(() => Category)
  parentCategory?: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

applyBaseSchemaHooks(CategorySchema);
