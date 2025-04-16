import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

import { Category } from './categories.schema';

@Schema()
export class ProductStub extends BaseSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: unknown;
}

@Schema()
export class Product extends ProductStub {
  category: string;
}

@Schema()
export class PopulatedProduct extends ProductStub {
  @Type(() => Category)
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

applyBaseSchemaHooks(ProductSchema);
