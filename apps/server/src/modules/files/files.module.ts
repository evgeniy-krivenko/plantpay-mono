import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { path as dir } from 'app-root-path';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(dir, 'uploads'),
      serveRoot: '/static',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
