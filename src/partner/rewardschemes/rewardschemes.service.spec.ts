import { Test, TestingModule } from '@nestjs/testing';
import { RewardschemesService } from './rewardschemes.service';

describe('RewardschemesService', () => {
  let service: RewardschemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardschemesService],
    }).compile();

    service = module.get<RewardschemesService>(RewardschemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
