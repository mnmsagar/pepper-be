import { Controller, Req, Query, Get, Post } from '@nestjs/common';
import { RewardschemesService } from './rewardschemes.service';

@Controller('partner/rewardschemes')
export class RewardschemesController {
  constructor(private readonly rewardschemesService: RewardschemesService) {}

  @Get()
  async findAll(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    let userId = null;
    if (req.user && req.user.id) {
      userId = req.user.id;
    }
    // Logic to retrieve all reward schemes
    const result = await this.rewardschemesService.getAllRewardSchemes(
      page,
      limit,
      userId,
    );
    return {
      message: 'List of all reward schemes',
      success: true,
      ...result, // will include { data, meta }
    };
  }

  @Post()
  async create() {
    // Logic to create a new reward scheme
  }

  @Get(':id')
  async findOne() {
    // Logic to retrieve a specific reward scheme by ID
  }

  @Put(':id')
  async update() {
    // Logic to update a specific reward scheme by ID
  }
}
