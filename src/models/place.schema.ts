import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Place extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  alternativeNames: string[];

  @Prop({
    type: { longitude: { type: Number }, latitude: { type: Number } },
    required: true,
  })
  location: { latitude: number; longitude: number };

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
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
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

  @Prop({ default: 0, index: true })
  reviewsCountLastMonth: number;

  @Prop({ default: 0, index: true })
  averageRating: number;

  @Prop({ default: '' })
  averageRatingLabel: string;

  @Prop({ default: Date.now, index: true })
  createdAt: Date;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.index({ location: '2dsphere' });
