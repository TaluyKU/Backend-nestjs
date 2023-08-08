import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from 'src/models/place.schema';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly PlaceModel: Model<Place>,
  ) {}

  async getAllPlace() {
    const places = await this.PlaceModel.find().exec();
    console.log(`[GET] All Place: ${places}`);
    return places;
  }

  async findPlaceById(id: string) {
    const places = await this.PlaceModel.findById(id).exec();
    console.log(`[GET] Place By Id: ${places}`);
    return places;
  }

  async addPlace(place: Place) {
    const newPlace = await this.PlaceModel.create(place);
    console.log(`[CREATE] Place: ${newPlace}`);
    return newPlace;
  }
}
