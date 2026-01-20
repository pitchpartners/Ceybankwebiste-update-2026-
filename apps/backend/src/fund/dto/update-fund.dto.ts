import { PartialType } from '@nestjs/mapped-types';
import { CreateFundPriceDto } from './create-fund.dto';

export class UpdateFundDto extends PartialType(CreateFundPriceDto) {}
