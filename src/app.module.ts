import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from './map/map.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mild:FXG9aepfc8sJlz1b@cluster0.q9mqwq4.mongodb.net/taluyKU'), MapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
