import { Module } from '@nestjs/common';
import { ContactSettingsService } from './contact-settings.service';
import { ContactSettingsController } from './contact-settings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactSettingsController],
  providers: [ContactSettingsService],
  exports: [ContactSettingsService],
})
export class ContactSettingsModule {}
