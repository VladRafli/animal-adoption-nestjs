import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateResetPasswordDto {
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
    minSymbols: 0,
  })
  @IsNotEmpty()
  password: string;
}
