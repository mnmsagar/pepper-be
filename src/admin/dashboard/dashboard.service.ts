import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard(): any {
    return {
      message: 'This is the dashboard data',
      stats: {
        partners: [],
        members: [],
        transactions: [],
        redemptions: [],
      },
    };
  }
}
