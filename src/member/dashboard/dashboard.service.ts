import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard(): any {
    return {
      message: 'This is the dashboard data',
      data: {
        currentCoinBalance: 7500,
        totalCoinsEarned: 15000,
        totalCoinsRedeemed: 7500,
        numberOfRedeemedSchemes: 8,
        transactionHistory: [
          {
            id: 1,
            amount: 100,
            date: '2024-01-01',
            type: 'CREDIT',
            availableBalance: 5100,
          },
          {
            id: 2,
            amount: 200,
            date: '2024-01-02',
            type: 'DEBIT',
            availableBalance: 4900,
          },
        ],
        recentActivity: [],
      },
    };
  }
}
