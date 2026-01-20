import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FundReportType } from '@repo/database';
import { toBoolean, trimString } from '../../common/transformers';

export class CreateFundReportDto {
  @Transform(trimString)
  @IsString()
  fundId: string;

  @Transform(trimString)
  @IsString()
  @MaxLength(300)
  title: string;

  @Type(() => Number)
  @IsInt()
  year: number;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  periodLabel?: string | null;

  @IsEnum(FundReportType)
  type: FundReportType;

  @IsOptional()
  @Type(() => Date)
  publishedAt?: Date | null;

  @IsOptional()
  @IsBoolean()
  @Transform(toBoolean)
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  order?: number;
}
