import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileFilterCallback, memoryStorage } from 'multer';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { Request } from 'express';
import { NewsService } from './news.service';
import {
  AdminNewsQueryDto,
  CreateNewsDto,
  NewsListQueryDto,
  UpdateNewsDto,
  UpdateNewsStatusDto,
} from './dto/news.dto';

const uploadOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      (cb as unknown as (error: any, acceptFile: boolean) => void)(
        new BadRequestException('Only image uploads are allowed'),
        false,
      );
    }
  },
};

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getPublic(@Query() query: NewsListQueryDto) {
    return this.newsService.getPublicList(query);
  }

  @Get(':idOrSlug')
  getPublicByIdOrSlug(@Param('idOrSlug') idOrSlug: string) {
    return this.newsService.getPublicOne(idOrSlug);
  }
}

@UseGuards(AuthGuard)
@Controller('admin/news')
export class NewsAdminController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAdminList(@Query() query: AdminNewsQueryDto) {
    return this.newsService.getAdminList(query);
  }

  @Get(':idOrSlug')
  getAdminById(@Param('idOrSlug') idOrSlug: string) {
    return this.newsService.getAdminById(idOrSlug);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'coverImage', maxCount: 1 },
        { name: 'gallery', maxCount: 20 },
      ],
      uploadOptions,
    ),
  )
  create(
    @Body() dto: CreateNewsDto,
    @UploadedFiles()
    files?: {
      coverImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    return this.newsService.create(dto, files?.coverImage?.[0], files?.gallery);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'coverImage', maxCount: 1 },
        { name: 'gallery', maxCount: 20 },
      ],
      uploadOptions,
    ),
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNewsDto,
    @UploadedFiles()
    files?: {
      coverImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    return this.newsService.update(id, dto, {
      coverImage: files?.coverImage,
      gallery: files?.gallery,
    });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateNewsStatusDto) {
    return this.newsService.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.softDelete(id);
  }
}
