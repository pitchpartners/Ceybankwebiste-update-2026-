import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { FundService } from './fund.service';
import {
  AddTodayFundPriceDto,
  CreateFundDto,
  CreateFundPriceDto,
  FundPricesQueryDto,
  UpdateFundDto,
} from './dto/create-fund.dto';
import { FundAboutResponse } from './dto/fund-about.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { FundPrice } from '@repo/database';

@Controller('funds')
export class FundController {
  constructor(private readonly fundService: FundService) {}

  // Public - List all funds
  @Get()
  async getFunds() {
    return this.fundService.getAllFunds();
  }

  /**
   * Public: Fetch prices (optionally filter by date)
   */
  @Get('prices')
  async getPrices(@Query() query: FundPricesQueryDto) {
    return this.fundService.getAllPrices(query);
  }

  /**
   * Public: Fetch prices (optionally filter by date)
   */
  @Get('last-prices')
  async getLastPrices() {
    return this.fundService.getAllLastPrices();
  }

  @Get(':slug')
  async getFundAbout(@Param('slug') slug: string): Promise<FundAboutResponse> {
    return this.fundService.getFundAboutBySlug(slug);
  }

  // Authenticated - Create fund
  @Post()
  @UseGuards(AuthGuard)
  async createFund(@Body() dto: CreateFundDto) {
    return this.fundService.createFund(dto);
  }

  // Authenticated - Update fund
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateFund(@Param('id') id: string, @Body() dto: UpdateFundDto) {
    return this.fundService.updateFund(id, dto);
  }

  // Authenticated - Delete fund
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteFund(@Param('id') id: string) {
    return this.fundService.deleteFund(id);
  }

  /**
   * Authenticated: Add a new daily price
   */
  @Post('prices')
  @UseGuards(AuthGuard)
  async addPrice(@Body() dto: CreateFundPriceDto) {
    return this.fundService.createFundPrice(dto);
  }

  @Post('/prices/today')
  @UseGuards(AuthGuard)
  async addTodayFundPrices(
    @Body() dto: AddTodayFundPriceDto,
  ): Promise<FundPrice[]> {
    return this.fundService.addTodayFundPrices(dto);
  }
  /**
   * Authenticated: Update an existing price by ID
   */
  @Patch('prices/:id')
  @UseGuards(AuthGuard)
  async updatePrice(@Param('id') id: string, @Body() dto: CreateFundPriceDto) {
    return this.fundService.updateFundPrice(Number(id), dto);
  }
}
