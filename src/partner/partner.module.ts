import { Module } from '@nestjs/common';
import { CoinrulesModule } from './coinrules/coinrules.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RazorpayController } from './razorpay/razorpay.controller';
import { RazorpayModule } from './razorpay/razorpay.module';
import { RewardschemesModule } from './rewardschemes/rewardschemes.module';

@Module({
  imports: [CoinrulesModule, DashboardModule, RazorpayModule, RewardschemesModule],
})
export class PartnerModule {}
