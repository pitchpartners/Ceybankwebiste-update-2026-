import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { trimString, toBoolean } from '../../common/transformers';

export class NewsListQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class AdminNewsQueryDto extends NewsListQueryDto {
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MaxLength(200)
  q?: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'all'])
  status?: 'active' | 'inactive' | 'all';
}

export class CreateNewsDto {
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  slug: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  excerpt: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  publishedAt: string;

  @IsOptional()
  @IsBoolean()
  @Transform(toBoolean)
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  order?: number;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsOptional()
  @IsString()
  existingImages?: string;

  @IsOptional()
  @IsString()
  galleryOrder?: string;
}

export class UpdateNewsStatusDto {
  @IsBoolean()
  @Transform(toBoolean)
  isActive: boolean;
}
