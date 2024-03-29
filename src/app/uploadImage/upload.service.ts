import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  private readonly logger = new Logger(UploadService.name);

  async uploadImage(request: Request, imageBase64: string) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    // Decode base64 string to Buffer
    const buffer = Buffer.from(imageBase64, 'base64');
    const uniqueFileName = `${uuidv4()}.jpg`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'taluyku',
          Key: uniqueFileName,
          Body: buffer,
          ContentType: 'image/jpeg',
        }),
      );
      return uniqueFileName;
    } catch (error) {
      this.logger.error(`[UploadImage] ${error}`);
      throw new Error(`[UploadImage] ${error}`);
    }
  }

  async uploadProfileImage(request: Request, imageBase64: string) {
    if (!this.authService.checkAuth(request)) {
      throw new Error('Unauthorized');
    }

    console.log(imageBase64);
    // Decode base64 string to Buffer
    const buffer = Buffer.from(imageBase64, 'base64');
    const uniqueFileName = `${uuidv4()}.jpg`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'taluyku-profile',
          Key: uniqueFileName,
          Body: buffer,
          ContentType: 'image/jpeg',
        }),
      );
      this.authService.updateAvatar(request, uniqueFileName);
      return uniqueFileName;
    } catch (error) {
      this.logger.error(`[UploadImage] ${error}`);
      throw new Error(`[UploadImage] ${error}`);
    }
  }
}
