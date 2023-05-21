import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Travel } from '../models/travel.model';

@Injectable()
export class MapService {
  constructor(
    @InjectModel('Travel') private readonly  travelModel: Model<Travel>
  ) {}

  async insertTravel( object: Travel) {
    const newTravel = new this.travelModel({
      name: object.name,
      altenativeNames: object.altenativeNames,
      type: object.type,
      positions: object.positions,
      images: object.images,
      generalInfo: object.generalInfo,
      price: object.price
    })
    const result = await newTravel.save();
    console.log(result);
    return result
  }
  
  async getTravel() {
    const travels = await this.travelModel.find().exec();
    return travels
  }
}
