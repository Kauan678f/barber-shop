import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { BarbershopService } from '../barbershop/barbershop.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: "60s"}
  })],
  providers: [PrismaService, BarbershopService],
  controllers: [AuthController]
})
export class AuthModule {}
