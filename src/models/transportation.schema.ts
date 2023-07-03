import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transportation extends Document{
  @Prop({ required: true })
  name: string;

  @Prop()
  alternativeNames: string[];

  @Prop({ required: true, enum: ['motorbike', 'bus'] })
  type: string;

  @Prop({ required: true })
  location: number[];

  @Prop()
  images: string[];

  @Prop()
  generalInfo: string;

  @Prop({ type: Map, of: Number })
  price: Map<string, number>;
}

export const TransportationSchema = SchemaFactory.createForClass(Transportation); 