import { Injectable } from '@nestjs/common';
import { IImageElement, ImageExtension } from '@plantpay-mono/types';
import { path as dir } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';

@Injectable()
export class FilesService {
  async createImageFromBuffer(buffer: Buffer, ext: ImageExtension): Promise<IImageElement> {
    const dataFolderName = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = join(dir, 'uploads', dataFolderName);
    await ensureDir(uploadFolder);
    const id = uuid();
    const fileName = id + '.' + ext;
    const savedFilePath = join(uploadFolder, fileName);
    const url = join(dataFolderName, fileName);
    const cropedBuffer = await this.cropProductImage(buffer, ext);
    await writeFile(savedFilePath, cropedBuffer);
    return { url, id, isMain: false };
  }

  private async cropProductImage(file: Buffer, ext: ImageExtension): Promise<Buffer> {
    return sharp(file).resize({ width: 624 }).toFormat(ext).toBuffer();
  }
}
