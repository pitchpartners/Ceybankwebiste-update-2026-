import { FundCategory } from '@repo/database';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { trimString } from '../../common/transformers';

export class CreateFundDto {
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  slug: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsEnum(FundCategory)
  category: FundCategory;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  riskLevel: string;

  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MaxLength(500)
  shortDescription?: string | null;

  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MaxLength(5000)
  longDescription?: string | null;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateFundPriceDto {
  @Transform(trimString)
  @IsString()
  fundId: string;

  @IsNumber()
  @Type(() => Number)
  bidPrice: number;

  @IsNumber()
  @Type(() => Number)
  offerPrice: number;

  @IsDateString()
  date: string;
}

export class AddTodayFundPriceItemDto {
  @Transform(trimString)
  @IsString()
  fundId: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  bidPrice: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  offerPrice: number;
}

export class AddTodayFundPriceDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddTodayFundPriceItemDto)
  prices: AddTodayFundPriceItemDto[];
}

export class UpdateFundDto extends PartialType(CreateFundDto) {}

export class FundPricesQueryDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
