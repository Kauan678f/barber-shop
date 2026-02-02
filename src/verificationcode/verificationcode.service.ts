import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import  VerificationCodeModel  from './models/verificationCodeModel';

@Injectable()
export class VerificationcodeService {
    constructor(private prismaService: PrismaService){}

    async findEmail(email: string){
        return await this.prismaService.verificationCode.findUnique({
            where: {email: email},
            select: {
                email: true
            }
        })
    }

    async create(data: VerificationCodeModel){
        return await this.prismaService.verificationCode.create({
            data: data,
            select: {
                email: true
            }
        })
    }

    async delete(email: string){
        return await this.prismaService.verificationCode.delete({
            where: {email},
            select: {
                email: true
            }
        })
    }

    async update(email: string, code: string){
        return await this.prismaService.verificationCode.update({
            where: {email},
            data: {
                code: code
            },
            select: {
                email: true
            }
        })
    }
}