import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FundReportType } from '@repo/database';

export class ListFundReportDto {
  @IsOptional()
  @Transform(({ value }): string | undefined =>
    value === undefined ? undefined : String(value),
  )
  @IsString()
  fundId?: string;

  @IsOptional()
  @IsEnum(FundReportType)
  type?: FundReportType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageSize?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === 'all'
    ) {
      return undefined;
    }
    return value === 'true' || value === true;
  })
  @IsBoolean()
  isActive?: boolean;
}
