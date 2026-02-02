import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarbershopModule } from './barbershop/barbershop.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { VerificationcodeModule } from './verificationcode/verificationcode.module';
// import { VerificationcodeModule } from './verificationcode/verificationcode.module';

@Module({
  imports: [BarbershopModule, AuthModule, VerificationcodeModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
