import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt"
import BarberShopMODEL from './models/barbershop';


@Injectable()
export class BarbershopService {
    constructor(private prismaService: PrismaService){}

    async emailExists(email: string): Promise<boolean>{
        const user = await this.prismaService.barberShop.findUnique({
            where: {email}
        })
        return !!user
    }

    async creteBarberShop(data: BarberShopMODEL): Promise<Object>{
        try {
            const barberShop = await this.prismaService.barberShop.create({
                data: {
                    ...data,
                    password: await bcrypt.hash(data.password, 10)
                },
                select: {
                    id: true,
                    name: true
                }
            })
            return barberShop;
        } catch (e: any) {
            if(e?.code === "P2002"){
                throw new ConflictException('Email is already in use');
            }
            throw e;
        }
    }
}
