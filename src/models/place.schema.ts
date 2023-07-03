import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Place extends Document{
  @Prop({ required: true })
  name: string;

  @Prop()
  alternativeNames: string[];

  @Prop({ required: true })
  location: number[];

  @Prop()
  generalInfo: string;

  @Prop()
  images: string[];

  @Prop({
    type: [
      {
        day: {
          type: String,
          enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        openingTime: { type: String },
        closingTime: { type: String },
      },
    ],
    required: true,
  })
  weeklySchedule: {
    day: string;
    openingTime: string;
    closingTime: string;
  }[];

  @Prop({
    required: true,
    type: [SchemaTypes.ObjectId],
    ref: 'Category',
  })
  categories: string[];

  @Prop()
  address: string;

  @Prop()
  phone: string[];

  @Prop()
  website: string[];

  @Prop()
  email: string[];
}

export const PlaceSchema = SchemaFactory.createForClass(Place);