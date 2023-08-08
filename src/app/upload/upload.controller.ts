import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
        throw new HttpException('No Image Provided', HttpStatus.BAD_REQUEST)
    }
    console.log(`[POST] Upload image: ${file.originalname}`);
    return await this.uploadService.uploadImage(file.originalname, file.buffer);
  }
}
