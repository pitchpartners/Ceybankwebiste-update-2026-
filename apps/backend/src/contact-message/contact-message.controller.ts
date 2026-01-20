import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('contact-messages')
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.contactMessageService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.contactMessageService.findAll();
  }
}
