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
        date: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        time: { 
          start: {
            hour: { type: String },
            minute: { type: String },
          },
          end: {
            hour: { type: String },
            minute: { type: String },
          },
        },
      },
    ],
  })
  weeklySchedule: {
    date: string;
    time: {
      start: {
        hour: string;
        minute: string;
      };
      end: {
        hour: string;
        minute: string;
      };
    };
  }[];

  @Prop({
    required: true,
  })
  categories: string[];

  @Prop()
  phone: string[];

  @Prop()
  website: string[];

  @Prop()
  email: string[];
}

export const PlaceSchema = SchemaFactory.createForClass(Place);