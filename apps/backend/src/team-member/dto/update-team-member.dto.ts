import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemberDto } from './create-team-member.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}

export class UpdateTeamMemberStatusDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive: boolean;
}
