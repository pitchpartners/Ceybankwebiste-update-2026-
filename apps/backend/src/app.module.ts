import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@repo/auth';
import { FundModule } from './fund/fund.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { BranchModule } from './branch/branch.module';
import { ContactMessageModule } from './contact-message/contact-message.module';
import { FundReportModule } from './fund-report/fund-report.module';
import { MoneyMarketSnapshotModule } from './money-market-snapshot/money-market-snapshot.module';
import { EquitySnapshotModule } from './equity-snapshot/equity-snapshot.module';
import { ContactSettingsModule } from './contact-settings/contact-settings.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule.forRoot({
      auth,
      disableGlobalAuthGuard: true,
    }),
    FundModule,
    TeamMemberModule,
    BranchModule,
    ContactMessageModule,
    FundReportModule,
    MoneyMarketSnapshotModule,
    EquitySnapshotModule,
    ContactSettingsModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
