import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transportation } from 'src/models/transportation.schema';
import { TransportationService } from './transportation.service';

@Controller('transportation')
export class TransportationController {
  constructor(
    private readonly transportationService: TransportationService,
  ) {}

  @Post('/create')
  createTransportation(@Body() newTransportation: Transportation) {
    return this.transportationService.createTransportation(newTransportation);
  }

  @Get('/all')
  getAllTransportation() {
    return this.transportationService.getAllTransportation();
  }

  @Get('/find/:id')
  findTransportationById(@Param('id') id: string) {
    return this.transportationService.findTransportationById(id);
  }
}
