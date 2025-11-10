import { Controller, Get, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('partner/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  getDashboard(@Req() req: any) {
    return this.dashboardService.getDashboard(req.user.id);
  }
}
