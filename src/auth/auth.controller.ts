import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import SignInDto from './dtos/signinauth';
import { BarbershopService } from '../barbershop/barbershop.service';
// import { BarbershopService } from '../barbershop/barbershop.service';
import * as bcrypt from "bcrypt"

@Controller('auth')
export class AuthController {
    constructor(private barbershopService: BarbershopService) { }

    @Post('signin') // email, password, type: barbershop, barber, client
    async signin(@Body() body: SignInDto) {
        if (body.type === "barbershop") {
            console.log(`DEBUG: ${body.type}`)
            const emailExists: boolean = await this.barbershopService.emailExists(body.email)
            if (!emailExists) {
                console.log(`DEBUG: email invalido`)
                throw new UnauthorizedException('Credenciais inválidas');
            }
        }
    }
}

