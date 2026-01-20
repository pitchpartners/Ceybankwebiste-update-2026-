import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { toBoolean, trimString } from '../../common/transformers';

export class CreateBranchDto {
  @Transform(trimString)
  @IsString()
  @MaxLength(200)
  name: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  city?: string;

  @Transform(trimString)
  @IsString()
  @MaxLength(100)
  primaryPhone: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  secondaryPhone?: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  email?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  order?: number;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isActive?: boolean;
}
