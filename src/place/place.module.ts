import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [PlaceService],
  controllers: [PlaceController]
})
export class PlaceModule {}
