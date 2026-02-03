import { Controller, Post, Body, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { AuthService } from '../auth/auth.service';
import SignupBarberShopDTO from './dtos/signupbarbershop';
import BarberShopMODEL from './models/barbershop';
import { VerificationcodeService } from '../verificationcode/verificationcode.service';

@Controller('barbershop')
export class BarbershopController {
    constructor(
        private barbershopService: BarbershopService,
        private authService: AuthService,
        private verificationCodeService: VerificationcodeService
    ) { }

    @Post('signup')
    async signup(@Body() body: SignupBarberShopDTO) {

        const { passwordConfirm, code, ...data } = body;
        const userExist: boolean = !!await this.barbershopService.emailExists(data.email) 
        if (userExist) 
            throw new ConflictException("Email já está em uso");
            
        if (data.password !== passwordConfirm)
            throw new BadRequestException('A senha e a confirmação de senha devem ser iguais');

        // const userTemporary = await this.verificationCodeService.findEmail(body.email)
        // if (userTemporary)
        //     throw new UnauthorizedException("Usuario não existe!")

        const isCodeValid: boolean = await this.verificationCodeService.isVerify(data.email, code);
        if (!isCodeValid)
            throw new BadRequestException('Codigo Invalido.');

        // let userCreated: object = await this.barbershopService.creteBarberShop(data);
        this.barbershopService.creteBarberShop(data);

        // if (!userCreated)
        //     throw new BadRequestException('Usuário não criado');

        this.verificationCodeService.delete(body.email)

        return {
            message: 'Usuário criado com sucesso',
            // user: userCreated,
        };
        
    }
}
