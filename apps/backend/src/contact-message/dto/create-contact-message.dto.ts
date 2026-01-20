import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { trimString } from '../../common/transformers';

export class CreateContactMessageDto {
  @Transform(trimString)
  @IsString()
  @MaxLength(200)
  name: string;

  @Transform(trimString)
  @IsEmail()
  @MaxLength(200)
  email: string;

  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  subject: string;

  @Transform(trimString)
  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  message: string;
}
