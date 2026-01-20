import { Module } from '@nestjs/common';
import { EquitySnapshotService } from './equity-snapshot.service';
import { EquitySnapshotController } from './equity-snapshot.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EquitySnapshotController],
  providers: [EquitySnapshotService],
  exports: [EquitySnapshotService],
})
export class EquitySnapshotModule {}
