import { PartialType } from '@nestjs/mapped-types';
import { CreateFundReportDto } from './create-fund-report.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateFundReportDto extends PartialType(CreateFundReportDto) {}

export class UpdateFundReportStatusDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive: boolean;
}
