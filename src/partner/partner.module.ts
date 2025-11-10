import { Module } from '@nestjs/common';
import { CoinrulesModule } from './coinrules/coinrules.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [CoinrulesModule, DashboardModule]
})
export class PartnerModule {}
