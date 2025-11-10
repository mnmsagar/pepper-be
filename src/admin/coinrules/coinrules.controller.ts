import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { CreateCoinRuleDto } from '../dto/coinrules.dto';
import { CoinrulesService } from './coinrules.service';

@Controller('admin/coinrules')
export class CoinrulesController {
  constructor(private readonly coinrulesService: CoinrulesService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req,
  ) {
    // Logic to retrieve all coin rules

    console.log('Requesting user in controller:', req.user); // Example of accessing user info from the request

    const result = await this.coinrulesService.getAllCoinRules(
      page,
      limit,
      req,
    );
    return {
      message: 'List of all coin rules',
      success: true,
      ...result, // will include { data, meta }
    };
  }

  @Post()
  async create(@Body() createCoinRuleDto: CreateCoinRuleDto) {
    await this.coinrulesService.createCoinRule(createCoinRuleDto);
    return {
      message: 'New coin rule created',
      success: true,
    };
  }
}
