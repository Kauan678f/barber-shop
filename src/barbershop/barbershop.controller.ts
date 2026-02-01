import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { AuthService } from '../auth/auth.service';
import  SignupBarberShopDTO  from './dtos/signupbarbershop';
import BarberShopMODEL from './models/barbershop';

@Controller('barbershop')
export class BarbershopController {
    constructor(private barbershopService: BarbershopService, private authService: AuthService){}

    @Post('signup')
    async signup(@Body() body: SignupBarberShopDTO){

        const { passwordConfirm, code, ...data } = body;
        const user = await this.barbershopService.findUserEmail(data.email)
        if(!!user){
            throw new UnauthorizedException("Email is already in use");
        }

        if(data.password !== passwordConfirm){
            throw new UnauthorizedException("Password and confirmation must be the same");
        }

        const ok = this.authService.isVerify(data.email, code);
        if (!ok) {
        throw new UnauthorizedException('Invalid verification code');
        }

        return await this.barbershopService.creteBarberShop(data);
    }
}
