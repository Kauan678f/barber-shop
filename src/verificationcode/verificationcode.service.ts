import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import VerificationCodeModel from './models/verificationcodemodel';

@Injectable()
export class VerificationcodeService {
    constructor(private prismaService: PrismaService){}

    async emailExists(email: string): Promise<boolean> {
        let user = await this.prismaService.verificationCode.findUnique({
            where: {email},
        })

        return !!user;
    }

    async create(data: VerificationCodeModel): Promise<void> {
        console.log("DEBUG:", data.email)
        await this.prismaService.verificationCode.create({
            data
        })
    }

    async delete(email: string): Promise<void> {
        await this.prismaService.verificationCode.delete({
            where: {email}
        })
    }

    async update(email: string, code: string): Promise<void> {
        await this.prismaService.verificationCode.update({
            where: {email},
            data: {
                code: code
            }
        })
    }

    async isVerify(email: string, code: string): Promise<boolean>{
        const objectEmail = await this.prismaService.verificationCode.findUnique({
            where: {
                email, 
                code
            }
        });

        return !!objectEmail;
    }
}