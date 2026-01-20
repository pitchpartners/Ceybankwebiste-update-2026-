import { Module } from '@nestjs/common';
import { FundReportService } from './fund-report.service';
import { FundReportController } from './fund-report.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [FundReportController],
  providers: [FundReportService, UploadService],
})
export class FundReportModule {}
