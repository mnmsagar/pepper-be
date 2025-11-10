import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard(): any {
    return {
      message: 'This is the dashboard data',
      stats: {
        total_coins_distributed: 10000,
        wallet_balance: 5000,
      },
    };
  }
}
