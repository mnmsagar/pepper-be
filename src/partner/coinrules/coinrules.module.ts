import { Module } from '@nestjs/common';
import { CoinrulesController } from './coinrules.controller';
import { CoinrulesService } from './coinrules.service';

@Module({
  controllers: [CoinrulesController],
  providers: [CoinrulesService]
})
export class CoinrulesModule {}
