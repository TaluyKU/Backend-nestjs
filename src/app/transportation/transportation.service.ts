import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transportation } from 'src/models/transportation.schema';

@Injectable()
export class TransportationService {
  constructor(
    @InjectModel('Transportation')
    private readonly transportationModel: Model<Transportation>,
  ) {}

  async getAllTransportation() {
    const allTransportation = await this.transportationModel.find().exec();
    // this.logger.debug(`[GET] All Transportation: ${allTransportation}`);
    return allTransportation;
  }

  async findTransportationById(id: string) {
    const foundTransportation = await this.transportationModel
      .findById(id)
      .exec();
    // this.logger.debug(`[GET] Transportation By Id: ${foundTransportation}`);
    return foundTransportation;
  }

  async createTransportation(transportation: Transportation) {
    const createdTransportation = await this.transportationModel.create(
      transportation,
    );
    // this.logger.debug(`[CREATE] Create Transportation: ${createdTransportation}`);
    return createdTransportation;
  }
}
