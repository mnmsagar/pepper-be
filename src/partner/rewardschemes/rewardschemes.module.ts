import { Module } from '@nestjs/common';
import { RewardschemesController } from './rewardschemes.controller';
import { RewardschemesService } from './rewardschemes.service';

@Module({
  controllers: [RewardschemesController],
  providers: [RewardschemesService]
})
export class RewardschemesModule {}
