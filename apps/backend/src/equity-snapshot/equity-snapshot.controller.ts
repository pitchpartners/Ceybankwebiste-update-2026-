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
import {
  CreateEquitySnapshotDto,
  UpdateEquitySnapshotDto,
} from './dto/create-equity-snapshot.dto';
import { EquitySnapshotService } from './equity-snapshot.service';

@UseGuards(AuthGuard)
@Controller('admin')
export class EquitySnapshotController {
  constructor(private readonly service: EquitySnapshotService) {}

  @Post('funds/:fundId/equity/snapshots')
  create(
    @Param('fundId') fundId: string,
    @Body() dto: CreateEquitySnapshotDto,
  ) {
    return this.service.create(fundId, dto);
  }

  @Get('funds/:fundId/equity/snapshots')
  findAll(@Param('fundId') fundId: string) {
    return this.service.findAllForFund(fundId);
  }

  @Get('equity/snapshots/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('equity/snapshots/:id')
  update(@Param('id') id: string, @Body() dto: UpdateEquitySnapshotDto) {
    return this.service.update(id, dto);
  }

  @Delete('equity/snapshots/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
