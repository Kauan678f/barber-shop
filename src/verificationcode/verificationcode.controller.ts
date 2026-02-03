import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { VerificationcodeService } from './verificationcode.service';
import SignUpVerificationCodeDTO from './dtos/signupverificationcode';
import { sendCodeEmail } from '../utils/sendCodeEmail';
import { BarbershopService } from '../barbershop/barbershop.service';
import VerificationCodeModel from './models/verificationcodemodel';

@Controller('verificationcode')
export class VerificationcodeController {
    constructor(
        private verificationCodeService: VerificationcodeService,
        private barbershopService: BarbershopService
    ) { }

    @Post("signup")
    async signup(@Body() body: SignUpVerificationCodeDTO) {

        let emailMainExist: boolean = await this.barbershopService.emailExists(body.email)
        if (emailMainExist)
            throw new ConflictException("Email já está em uso");


        let emailExists: boolean = await this.verificationCodeService.emailExists(body.email)
        let codeGeread = Math.random().toString(36).substring(2, 8).toUpperCase();

        if (emailExists)
            this.verificationCodeService.update(body.email, codeGeread);

        else {
            const dataUser: VerificationCodeModel = {
                email: body.email,
                code: codeGeread
            }

            this.verificationCodeService.create(dataUser);
        }

        sendCodeEmail(body.email, codeGeread);

        return {
            message: 'Código de verificação enviado com sucesso',
        };
    }
}
