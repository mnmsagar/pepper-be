import { Module } from '@nestjs/common';
import { CoinrulesModule } from './coinrules/coinrules.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RazorpayController } from './razorpay/razorpay.controller';
import { RazorpayModule } from './razorpay/razorpay.module';

@Module({
  imports: [CoinrulesModule, DashboardModule, RazorpayModule],
})
export class PartnerModule {}
