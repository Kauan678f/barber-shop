import { Test, TestingModule } from '@nestjs/testing';
import { VerificationcodeController } from './verificationcode.controller';

describe('VerificationcodeController', () => {
  let controller: VerificationcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationcodeController],
    }).compile();

    controller = module.get<VerificationcodeController>(VerificationcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
