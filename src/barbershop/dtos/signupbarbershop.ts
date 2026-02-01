import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class SignupBarberShopDTO {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @MinLength(6)
  passwordConfirm!: string;

  @IsNotEmpty()
  code!: string;
}
