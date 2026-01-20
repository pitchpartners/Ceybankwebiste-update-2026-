import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async findActive() {
    return this.branchService.findActive();
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async findAll() {
    return this.branchService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateBranchDto) {
    return this.branchService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    return this.branchService.update(Number(id), dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.branchService.remove(Number(id));
  }
}
