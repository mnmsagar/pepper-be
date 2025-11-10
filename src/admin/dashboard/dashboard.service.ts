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
          value: 123,
          isPositive : true
        },
        totalPartners: {
          thisMonth: 50,
          value: 60,
          isPositive : false
        },
        activeMembers: {
          thisMonth: 36,
          value: 15,
          isPositive : true
        },
        coinsInCirculation: {
          thisMonth: 45,
          value: 78,
          isPositive : false
        },
        totalTransactions: {
          thisMonth: 78,
          value: 96,
          isPositive : false
        },
      },
    };
  }
}
