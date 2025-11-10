import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard(): any {
    return {
      message: 'This is the dashboard data',
      data: {
        pendingApprovals: [],
        topPerfomingPartners: [],
        totalMembers: {
          thisMonth: 100,
          lastMonth: 123,
        },
        totalPartners: {
          thisMonth: 50,
          lastMonth: 60,
        },
        activeMembers: {
          thisMonth: 36,
          lastMonth: 15,
        },
        coinsInCirculation: {
          thisMonth: 45,
          lastMonth: 78,
        },
        totalTransactions: {
          thisMonth: 78,
          lastMonth: 96,
        },
      },
    };
  }
}
