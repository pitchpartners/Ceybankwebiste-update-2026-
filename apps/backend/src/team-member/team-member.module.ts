import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeamMemberController],
  providers: [TeamMemberService, UploadService],
})
export class TeamMemberModule {}
