import { Test, TestingModule } from '@nestjs/testing';
import { CoinrulesService } from './coinrules.service';

describe('CoinrulesService', () => {
  let service: CoinrulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinrulesService],
    }).compile();

    service = module.get<CoinrulesService>(CoinrulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
