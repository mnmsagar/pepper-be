import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard(): any {
    return {
      message: 'This is the dashboard data',
      stats: {
        totalCoinsDistributed: 10000,
        walletBalance: 5000,
        activeSchemes: 12,
        totalTransactions: 250,
        recentTransactions: [
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
        topPerformingSchemes: [
          {
            name: 'Scheme A',
            coinsDistributed: 3000,
            numberOfUsers: 150,
          },
          {
            name: 'Scheme B',
            coinsDistributed: 2500,
            numberOfUsers: 120,
          },
        ],
      },
    };
  }
}
