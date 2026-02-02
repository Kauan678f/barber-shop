import { Body, Controller, Post } from '@nestjs/common';
import { VerificationcodeService } from './verificationcode.service';
import SignUpVerificationCodeDTO  from './dtos/signupverificationcode';
import { sendCodeEmail } from '../utils/sendCodeEmail';

@Controller('verificationcode')
export class VerificationcodeController {
    constructor(private verificationCodeService: VerificationcodeService){}

    @Post("signup")
    async signup(@Body() body: SignUpVerificationCodeDTO){
        let userFind = await this.verificationCodeService.findEmail(body.email)
        let codeGeread = Math.random().toString(36).substring(2, 8).toUpperCase();
        let user:object;

        if(!!userFind){
            let user = await this.verificationCodeService.update(body.email, codeGeread)
        }else{
            let user = await this.verificationCodeService.create({email: body.email, code: codeGeread})
        }

        await sendCodeEmail(body.email, codeGeread);

        return {}
        // await sendCodeEmail(body.email, codeGeread, 10)
    }
}
