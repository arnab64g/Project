import { Test, TestingModule } from '@nestjs/testing';
import { FcaseService } from './fcase.service';

describe('FcaseService', () => {
  let service: FcaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FcaseService],
    }).compile();

    service = module.get<FcaseService>(FcaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
