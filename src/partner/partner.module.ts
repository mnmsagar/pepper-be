import { Module } from '@nestjs/common';
import { CoinrulesModule } from './coinrules/coinrules.module';

@Module({
  imports: [CoinrulesModule]
})
export class PartnerModule {}
