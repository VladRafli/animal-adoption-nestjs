import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReadLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
