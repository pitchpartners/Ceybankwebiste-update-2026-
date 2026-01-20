import { Module } from '@nestjs/common';
import { MoneyMarketSnapshotService } from './money-market-snapshot.service';
import { MoneyMarketSnapshotController } from './money-market-snapshot.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MoneyMarketSnapshotController],
  providers: [MoneyMarketSnapshotService],
  exports: [MoneyMarketSnapshotService],
})
export class MoneyMarketSnapshotModule {}
