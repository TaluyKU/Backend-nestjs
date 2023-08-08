import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { MongodbModule } from 'src/app/mongodb/mongodb.module';
@Module({
  imports: [MongodbModule],
  providers: [MapService],
  controllers: [MapController],
})
export class MapModule {}
