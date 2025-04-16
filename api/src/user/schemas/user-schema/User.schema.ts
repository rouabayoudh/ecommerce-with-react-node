import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Language } from 'src/user/enums/language.enum';

import { applyBaseSchemaHooks } from '@/utils/generics/base-schema/Base.schema.hooks';
import { BaseSchema } from '@/utils/generics/Base.schema';

import { Role } from './../Role.schema';
import { preSaveHook, preUpdateHook } from './User.schema.hooks';

@Schema()
export class UserStub extends BaseSchema {
  @Prop({ required: true, unique: true, type: String, minlength: 5 })
  username: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, minlength: 6 })
  password: string;

  @Prop({ default: null, type: Number })
  phone?: number;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ type: String })
  lastName?: string;

  //TODO: avatar: attachment // how can i do the attachment ?

  @Prop({ default: false, type: Boolean })
  isVerified?: boolean;

  @Prop({ enum: Language, default: Language.EN, type: String })
  language?: Language;

  @Prop({ type: String, default: '' })
  salt?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Role.name }] })
  roles: unknown;

  @Prop({ type: String })
  adress?: string;
}

@Schema()
export class User extends UserStub {
  roles: string[];
}

@Schema()
export class PopulatedUser extends UserStub {
  @Type(() => Role)
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

applyBaseSchemaHooks(UserSchema);
UserSchema.pre('save', preSaveHook);
UserSchema.pre('findOneAndUpdate', preUpdateHook);
UserSchema.pre('updateOne', preUpdateHook);
