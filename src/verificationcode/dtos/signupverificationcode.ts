import { IsEmail, IsNotEmpty } from 'class-validator';

export default class SignUpVerificationCodeDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
