import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import {
  UpdateTeamMemberDto,
  UpdateTeamMemberStatusDto,
} from './dto/update-team-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilterCallback, memoryStorage } from 'multer';
import { Request } from 'express';

const uploadOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      (cb as unknown as (error: any, acceptFile: boolean) => void)(
        new BadRequestException('Only image uploads are allowed'),
        false,
      );
    }
  },
};

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  // Public: Active members for portfolio
  @Get()
  findActive() {
    return this.teamMemberService.findActive();
  }

  // Admin: All members
  @Get('all')
  findAll() {
    return this.teamMemberService.findAll();
  }

  // Public: Support contacts
  @Get('support')
  findSupport() {
    return this.teamMemberService.findSupport();
  }

  // Public: Single active member
  @Get(':id')
  findOne(@Param('id') id: string) {
    const memberId = Number(id);
    if (Number.isNaN(memberId)) {
      throw new BadRequestException('Invalid team member id');
    }
    return this.teamMemberService.findOnePublic(memberId);
  }

  // Admin: Create
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profileImage', uploadOptions))
  create(
    @Body() dto: CreateTeamMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.teamMemberService.create(dto, file);
  }

  // Admin: Update
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profileImage', uploadOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const memberId = Number(id);
    if (Number.isNaN(memberId)) {
      throw new BadRequestException('Invalid team member id');
    }
    return this.teamMemberService.update(memberId, dto, file);
  }

  // Admin: Status toggle
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberStatusDto,
  ) {
    const memberId = Number(id);
    if (Number.isNaN(memberId)) {
      throw new BadRequestException('Invalid team member id');
    }
    return this.teamMemberService.updateStatus(memberId, dto);
  }

  // Admin: Delete
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    const memberId = Number(id);
    if (Number.isNaN(memberId)) {
      throw new BadRequestException('Invalid team member id');
    }
    return this.teamMemberService.remove(memberId);
  }
}
