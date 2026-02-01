import { Controller } from '@nestjs/common';
import { VerificationcodeService } from './verificationcode.service';

@Controller('verificationcode')
export class VerificationcodeController {
    constructor(private verificationCodeService: VerificationcodeService){}
}
