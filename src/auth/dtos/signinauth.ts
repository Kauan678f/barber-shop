import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum SigninType {
  BARBERSHOP = 'barbershop',
  BARBER = 'barber',
  CLIENT = 'client',
}

export default class SignInDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(SigninType)
  type!: SigninType;
}
