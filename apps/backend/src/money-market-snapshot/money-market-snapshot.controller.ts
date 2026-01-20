import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { MoneyMarketSnapshotService } from './money-market-snapshot.service';
import {
  CreateMoneyMarketSnapshotDto,
  UpdateMoneyMarketSnapshotDto,
} from './dto/create-money-market-snapshot.dto';

@UseGuards(AuthGuard)
@Controller('admin')
export class MoneyMarketSnapshotController {
  constructor(private readonly service: MoneyMarketSnapshotService) {}

  @Post('funds/:fundId/money-market/snapshots')
  create(
    @Param('fundId') fundId: string,
    @Body() dto: CreateMoneyMarketSnapshotDto,
  ) {
    return this.service.create(fundId, dto);
  }

  @Get('funds/:fundId/money-market/snapshots')
  findAll(@Param('fundId') fundId: string) {
    return this.service.findAllForFund(fundId);
  }

  @Get('money-market/snapshots/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('money-market/snapshots/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMoneyMarketSnapshotDto) {
    return this.service.update(id, dto);
  }

  @Delete('money-market/snapshots/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
