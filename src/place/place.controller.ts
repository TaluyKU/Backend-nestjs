import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from 'src/models/place.schema';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/find/:id')
  findPlaceId(@Param('id') id: string) {
    const foundPlace = this.placeService.findPlaceById(id);
    return foundPlace;
  }

  @Get('/all')
  getAllPlace() {
    const allPlace = this.placeService.getAllPlace();
    return allPlace;
  }

  @Post('/create')
  createPlace(@Body() newPlace: Place) {
    const createdPlace = this.placeService.createPlace(newPlace);
    return createdPlace;
  }
}
