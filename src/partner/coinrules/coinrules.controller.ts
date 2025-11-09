import { Controller, Get, Post, Query } from '@nestjs/common';
import { CoinrulesService } from './coinrules.service';

@Controller('partner/coinrules')
export class CoinrulesController {
  constructor(private readonly coinrulesService: CoinrulesService) {}
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    // Logic to retrieve all coin rules
    const result = await this.coinrulesService.getAllCoinRules(page, limit);
    return {
      message: 'List of all coin rules',
      success: true,
      ...result, // will include { data, meta }
    };
  }
}
