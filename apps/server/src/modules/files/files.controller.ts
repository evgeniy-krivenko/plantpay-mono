import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IImageElement } from '@plantpay-mono/types';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { Express } from 'express';
import 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product/upload')
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<IImageElement> {
    if (!file.mimetype.includes('image')) {
      throw new HttpException('Wrong format file', HttpStatus.BAD_REQUEST);
    }
    const image = await this.filesService.createImageFromBuffer(file.buffer, 'jpeg');
    // hardcode image prefix
    image.url = '/static/' + image.url;
    return image;
  }
}
