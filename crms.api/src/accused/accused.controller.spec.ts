import { Test, TestingModule } from '@nestjs/testing';
import { AccusedController } from './accused.controller';

describe('AccusedController', () => {
  let controller: AccusedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccusedController],
    }).compile();

    controller = module.get<AccusedController>(AccusedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
