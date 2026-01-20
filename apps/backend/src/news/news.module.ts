import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UploadService } from '../upload/upload.service';
import { NewsController, NewsAdminController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule],
  controllers: [NewsController, NewsAdminController],
  providers: [NewsService, UploadService],
})
export class NewsModule {}
