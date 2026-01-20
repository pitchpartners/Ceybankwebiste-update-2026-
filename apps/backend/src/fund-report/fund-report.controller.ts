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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { FundReportService } from './fund-report.service';
import { CreateFundReportDto } from './dto/create-fund-report.dto';
import { UpdateFundReportDto } from './dto/update-fund-report.dto';
import { ListFundReportDto } from './dto/list-fund-report.dto';
import { FundReportType } from '@repo/database';

const uploadOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      (cb as unknown as (error: any, acceptFile: boolean) => void)(
        new BadRequestException('Only PDF uploads are allowed'),
        false,
      );
    }
  },
};

@Controller('fund-reports')
export class FundReportController {
  constructor(private readonly fundReportService: FundReportService) {}

  @Get()
  findAll(@Query() query: ListFundReportDto) {
    return this.fundReportService.findAll(query);
  }

  @Get('latest')
  findLatest(
    @Query('limit') limit?: string,
    @Query('type') type?: FundReportType,
  ) {
    const parsedLimit = limit ? Number(limit) : undefined;
    const safeLimit =
      parsedLimit && !Number.isNaN(parsedLimit) ? parsedLimit : 4;
    return this.fundReportService.findLatest(safeLimit, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundReportService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  create(
    @Body() dto: CreateFundReportDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.fundReportService.create(dto, file);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFundReportDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.fundReportService.update(id, dto, file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.fundReportService.remove(id);
  }
}
