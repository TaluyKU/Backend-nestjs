import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapService } from './map.service';

import { Travel } from '../models/travel.model';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post("/travel/insert")
  async addTravel(
    @Body("name") name: string,
    @Body("altName") altName: string[],
    @Body("type") type: string,
    @Body("pos") pos: number[],
    @Body("images") images: string[],
    @Body("info") info: string,
    @Body("price") price: Map<string, number>
  ) {
    const newTravel: Travel = {
      name: name,
      altenativeNames: altName,
      type: type,
      positions: pos,
      images: images,
      generalInfo: info,
      price: price
    };
    const travelObj = await this.mapService.insertTravel( newTravel )
    return travelObj
  }

  @Get("/travel/get")
  async getallTravel () {
    const travels = await this.mapService.getTravel()
    return travels
  }
}
