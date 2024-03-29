import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
  Req,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  private readonly logger = new Logger(UploadController.name);

  @Post('/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Req() req: Request) {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      throw new HttpException('No Image Provided', HttpStatus.BAD_REQUEST);
    }
    this.logger.log(`[POST] Upload image`);
    return await this.uploadService.uploadImage(req, imageBase64);
  }

  @Post('/profile')
  async uploadProfileImage(@Req() req: Request) {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      throw new HttpException('No Image Provided', HttpStatus.BAD_REQUEST);
    }
    this.logger.log(`[POST] Upload profile image`);
    return await this.uploadService.uploadProfileImage(req, imageBase64);
  }
}
