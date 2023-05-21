import * as mongoose from 'mongoose';

export const TravelSchema = new mongoose.Schema({
  name: { type: String, require: true },
  altenativeNames: [String],
  type: { type: String, require: true },
  positions: { type: [Number], require: true },
  images: [String],
  generalInfo: { type: String, default: "" },
  price: { type: Map, of: Number }
})

export interface Travel {
  id?: string;
  name: string;
  altenativeNames: string[];
  type: string;
  positions: number[];
  images: string[];
  generalInfo: string;
  price: Map<string, number>
}