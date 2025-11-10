import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardschemesService {
  // Service
  async getAllRewardSchemes(page: number, limit: number, userId: number) {
    // Logic to get all reward schemes with pagination
    return {
      data: [], // Replace with actual data retrieval logic
      meta: {
        page,
        limit,
        total: 0, // Replace with actual total count
      },
    };
  }
}
