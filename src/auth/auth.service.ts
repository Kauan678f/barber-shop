import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService){}
    
        async isVerify(email: string, code: string){
            const objectEmail = await this.prismaService.verificationCode.findUnique({
                where: {email}
            })
    
            if(!!objectEmail == false){
                return false;
            }
    
            if(objectEmail.code === code){
                true;
            }
        }
    
        
}
