import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  id: string;

  @Prop({ required: true, default: () => new Date(), type: Date })
  createdAt: Date;

  @Prop({ required: true, default: () => new Date(), type: Date })
  updatedAt: Date;

  @Prop({ required: false, default: null, type: Date })
  deletedAt?: Date;
}
