import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';
import { Place } from 'src/models/place.schema';
import { Category } from 'src/models/category.schema';
import { Transportation } from 'src/models/transportation.schema';

@Injectable()
export class MongodbService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    @InjectModel('Place') private readonly PlaceModel: Model<Place>,
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
    @InjectModel('Transportation')
    private readonly TransportationModel: Model<Transportation>,
  ) {}
}
