import { Body, Controller, Post } from '@nestjs/common';
import SignInDto from './dtos/signinauth';
// import { BarbershopService } from '../barbershop/barbershop.service';

@Controller('auth')
export class AuthController {
    // constructor(
    //     private barbershopService: BarbershopService
    // ){}

    // @Post('signin')
    // async signin(@Body() body: SignInDto){
    //     if(body.type === "barbershop"){

    //     }
    // }
}
