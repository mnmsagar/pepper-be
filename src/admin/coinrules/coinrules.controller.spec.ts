import { Test, TestingModule } from '@nestjs/testing';
import { CoinrulesController } from './coinrules.controller';

describe('CoinrulesController', () => {
  let controller: CoinrulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinrulesController],
    }).compile();

    controller = module.get<CoinrulesController>(CoinrulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
