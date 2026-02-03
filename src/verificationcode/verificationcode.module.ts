import { Module } from '@nestjs/common';
import { VerificationcodeController } from './verificationcode.controller';
import { VerificationcodeService } from './verificationcode.service';
import { PrismaService } from '../prisma/prisma.service';
import { BarbershopService } from '../barbershop/barbershop.service';

@Module({
  controllers: [VerificationcodeController],
  providers: [VerificationcodeService, PrismaService, BarbershopService]
})
export class VerificationcodeModule {}
