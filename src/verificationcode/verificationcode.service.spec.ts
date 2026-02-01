import { Test, TestingModule } from '@nestjs/testing';
import { VerificationcodeService } from './verificationcode.service';

describe('VerificationcodeService', () => {
  let service: VerificationcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationcodeService],
    }).compile();

    service = module.get<VerificationcodeService>(VerificationcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
