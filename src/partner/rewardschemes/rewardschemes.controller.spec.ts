import { Test, TestingModule } from '@nestjs/testing';
import { RewardschemesController } from './rewardschemes.controller';

describe('RewardschemesController', () => {
  let controller: RewardschemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardschemesController],
    }).compile();

    controller = module.get<RewardschemesController>(RewardschemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
