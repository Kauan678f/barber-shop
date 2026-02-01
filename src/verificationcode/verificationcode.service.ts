import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerificationCodeModel } from './models/verificationCodeModel';

@Injectable()
export class VerificationcodeService {
    constructor(private PrismaService: PrismaService){}

    async create(data: VerificationCodeModel){
        return await this.PrismaService.verificationCode.create({
            data: data,
            select: {
                email: true
            }
        })
    }
}