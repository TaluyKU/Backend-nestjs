import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AuthModule } from '../auth/auth.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [AuthModule, PlaceModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
