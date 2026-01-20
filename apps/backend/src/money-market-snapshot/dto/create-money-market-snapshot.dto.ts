import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LabelValueDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNumber()
  @Type(() => Number)
  value: number;
}

export class CreateMoneyMarketSnapshotDto {
  @IsDateString()
  asOfDate: string;

  @IsString()
  @IsNotEmpty()
  commentary: string;

  @IsNumber()
  @Type(() => Number)
  ytdReturn: number;

  @IsNumber()
  @Type(() => Number)
  oneMonthAnn: number;

  @IsNumber()
  @Type(() => Number)
  threeMonthAnn: number;

  @IsNumber()
  @Type(() => Number)
  currentYield: number;

  @IsNumber()
  @Type(() => Number)
  weightedMaturityMonths: number;

  @IsString()
  @IsNotEmpty()
  weightedRating: string;

  @IsNumber()
  @Type(() => Number)
  fundSizeMillions: number;

  @IsNumber()
  @Type(() => Number)
  unitPrice: number;

  @IsInt()
  @Type(() => Number)
  unitHolders: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabelValueDto)
  creditProfile: LabelValueDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabelValueDto)
  assetAllocation: LabelValueDto[];
}

export class UpdateMoneyMarketSnapshotDto extends CreateMoneyMarketSnapshotDto {}
