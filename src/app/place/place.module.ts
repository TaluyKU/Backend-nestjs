import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongodbModule } from 'src/app/mongodb/mongodb.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongodbModule, AuthModule],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
