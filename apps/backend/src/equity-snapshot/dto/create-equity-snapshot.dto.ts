import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

class HoldingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number | null;
}

export class CreateEquitySnapshotDto {
  @IsDateString()
  asOfDate: string;

  @IsNumber()
  @Type(() => Number)
  ytdCY: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ytdFY?: number | null;

  @IsNumber()
  @Type(() => Number)
  threeMonths: number;

  @IsNumber()
  @Type(() => Number)
  sixMonths: number;

  @IsNumber()
  @Type(() => Number)
  oneYear: number;

  @IsNumber()
  @Type(() => Number)
  threeYears: number;

  @IsNumber()
  @Type(() => Number)
  fiveYears: number;

  @IsNumber()
  @Type(() => Number)
  tenYears: number;

  @IsNumber()
  @Type(() => Number)
  fifteenYears: number;

  @IsNumber()
  @Type(() => Number)
  twentyYears: number;

  @IsNumber()
  @Type(() => Number)
  cvFund: number;

  @IsNumber()
  @Type(() => Number)
  cvMarket: number;

  @IsNumber()
  @Type(() => Number)
  beta: number;

  @IsNumber()
  @Type(() => Number)
  rSq: number;

  @IsNumber()
  @Type(() => Number)
  navMillions: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabelValueDto)
  sectorAllocation: LabelValueDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HoldingDto)
  topHoldings: HoldingDto[];
}

export class UpdateEquitySnapshotDto extends CreateEquitySnapshotDto {}
