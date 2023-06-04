import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
