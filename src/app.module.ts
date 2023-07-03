import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from './map/map.module';
import { PlaceModule } from './place/place.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MongodbService } from './mongodb/mongodb.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { TransportationModule } from './transportation/transportation.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mild:FXG9aepfc8sJlz1b@cluster0.q9mqwq4.mongodb.net/taluyKU',
    ),
    MapModule,
    PlaceModule,
    CategoryModule,
    MongodbModule,
    TransportationModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {}
