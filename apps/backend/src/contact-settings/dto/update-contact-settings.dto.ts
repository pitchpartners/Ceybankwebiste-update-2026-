import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateContactSettingsDto {
  @IsEmail()
  @IsNotEmpty()
  mainEmail: string;

  @IsString()
  @IsNotEmpty()
  mainPhone: string;

  @IsString()
  @IsNotEmpty()
  officeAddress: string;

  @IsOptional()
  @IsUrl()
  facebookUrl?: string | null;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string | null;

  @IsOptional()
  @IsUrl()
  twitterUrl?: string | null;

  @IsOptional()
  @IsUrl()
  instagramUrl?: string | null;

  @IsOptional()
  @IsUrl()
  youtubeUrl?: string | null;

  @IsOptional()
  @IsUrl()
  googleMapsEmbedUrl?: string | null;
}
