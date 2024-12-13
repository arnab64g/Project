import { Test, TestingModule } from '@nestjs/testing';
import { AccusedService } from './accused.service';

describe('AccusedService', () => {
  let service: AccusedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccusedService],
    }).compile();

    service = module.get<AccusedService>(AccusedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
