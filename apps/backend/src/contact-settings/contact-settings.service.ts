import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContactSettingsDto } from './dto/update-contact-settings.dto';

@Injectable()
export class ContactSettingsService {
  constructor(private prisma: PrismaService) {}

  private defaultSettings() {
    return {
      id: 1,
      mainEmail: 'customercare@ceybank.com',
      mainPhone: '+94 117 602000',
      officeAddress: 'No. 85, York Street, Colombo 01, Sri Lanka',
      facebookUrl: null,
      linkedinUrl: null,
      twitterUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.914222874926!2d79.8434270750887!3d6.666426421258042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2589d09bc2499%3A0x6c7b504e5ff1dd6b!2sCeybank%20Unit%20Trust!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk',
    };
  }

  async getSettings() {
    let settings = await this.prisma.contactSettings.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      const defaults = this.defaultSettings();
      settings = await this.prisma.contactSettings.create({
        data: defaults,
      });
    }

    return settings;
  }

  async updateSettings(dto: UpdateContactSettingsDto) {
    await this.getSettings();

    return this.prisma.contactSettings.update({
      where: { id: 1 },
      data: {
        mainEmail: dto.mainEmail,
        mainPhone: dto.mainPhone,
        officeAddress: dto.officeAddress,
        facebookUrl: dto.facebookUrl || null,
        linkedinUrl: dto.linkedinUrl || null,
        twitterUrl: dto.twitterUrl || null,
        instagramUrl: dto.instagramUrl || null,
        youtubeUrl: dto.youtubeUrl || null,
        googleMapsEmbedUrl: dto.googleMapsEmbedUrl || null,
      },
    });
  }
}
