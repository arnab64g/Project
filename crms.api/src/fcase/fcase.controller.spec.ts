import { Test, TestingModule } from '@nestjs/testing';
import { FcaseController } from './fcase.controller';

describe('FcaseController', () => {
  let controller: FcaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FcaseController],
    }).compile();

    controller = module.get<FcaseController>(FcaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
