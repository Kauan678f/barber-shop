import { Module } from '@nestjs/common';
import { BarbershopController } from './barbershop.controller';
import { BarbershopService } from './barbershop.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { VerificationcodeService } from '../verificationcode/verificationcode.service';

@Module({
  controllers: [BarbershopController],
  providers: [BarbershopService, PrismaService, AuthService, VerificationcodeService],
  exports: [BarbershopService]
})
export class BarbershopModule {}
