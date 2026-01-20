import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { toBoolean, trimString } from '../../common/transformers';

export class CreateTeamMemberDto {
  @Transform(trimString)
  @IsString()
  @MaxLength(200)
  name: string;

  @Transform(trimString)
  @IsString()
  @MaxLength(200)
  position: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  shortTitle?: string | null;

  @Transform(trimString)
  @IsString()
  bio: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  order?: number;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isActive?: boolean;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string | null;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(50)
  supportPhone?: string | null;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isSupportContact?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  supportOrder?: number;
}
