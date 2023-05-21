import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TravelSchema } from 'src/models/travel.model';

@Module({
  imports: [MongooseModule.forFeature([{name: "Travel", schema: TravelSchema}])],
  providers: [MapService],
  controllers: [MapController]
})
export class MapModule {}
