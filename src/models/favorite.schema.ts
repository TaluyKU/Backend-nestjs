import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Favorite extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
    index: true,
  })
  placeId: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
