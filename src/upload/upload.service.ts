import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({ 
        region: this.configService.get('AWS_REGION'),
    });

    constructor(private readonly configService: ConfigService) {}

    async uploadImage(fileName: string ,file: Buffer) {
        try{ await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'taluyku',
                Key: fileName,
                Body: file,
            })
        )
        return fileName
        } catch (error) {
            throw new Error(`[UploadImage] ${error}`)
        }
    }
}

