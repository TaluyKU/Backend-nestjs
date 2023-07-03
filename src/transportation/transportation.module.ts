import { Module } from '@nestjs/common';
import { TransportationService } from './transportation.service';
import { TransportationController } from './transportation.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [TransportationService],
  controllers: [TransportationController],
})
export class TransportationModule {}
