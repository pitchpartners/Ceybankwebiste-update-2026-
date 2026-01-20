import { Module } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageController } from './contact-message.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactMessageController],
  providers: [ContactMessageService],
})
export class ContactMessageModule {}
