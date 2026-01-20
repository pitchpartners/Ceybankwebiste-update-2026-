import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ContactSettingsService } from './contact-settings.service';
import { UpdateContactSettingsDto } from './dto/update-contact-settings.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller()
export class ContactSettingsController {
  constructor(private readonly service: ContactSettingsService) {}

  @Get('contact-settings')
  async getPublic() {
    return this.service.getSettings();
  }

  @UseGuards(AuthGuard)
  @Get('admin/contact-settings')
  async getAdmin() {
    return this.service.getSettings();
  }

  @UseGuards(AuthGuard)
  @Put('admin/contact-settings')
  async update(@Body() dto: UpdateContactSettingsDto) {
    return this.service.updateSettings(dto);
  }
}
