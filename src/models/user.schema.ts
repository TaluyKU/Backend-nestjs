import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
  @Prop({ required: true , unique: true})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  phone: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);