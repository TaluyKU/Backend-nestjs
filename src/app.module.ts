import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from 'src/app/map/map.module';
import { PlaceModule } from 'src/app/place/place.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { CategoryModule } from 'src/app/category/category.module';
import { MongodbService } from 'src/app/mongodb/mongodb.service';
import { MongodbModule } from 'src/app/mongodb/mongodb.module';
import { TransportationModule } from 'src/app/transportation/transportation.module';
import { UploadModule } from 'src/app/upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mild:FXG9aepfc8sJlz1b@cluster0.q9mqwq4.mongodb.net/taluyKU',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
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
