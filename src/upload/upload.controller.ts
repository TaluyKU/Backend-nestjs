import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() file: Express.Multer.File){
        file.buffer
    }
}
