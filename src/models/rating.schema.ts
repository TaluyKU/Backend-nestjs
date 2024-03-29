import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Rating extends Document {
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

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
