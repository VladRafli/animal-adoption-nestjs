import { RolesEnum } from '@/_enum';
import {
  IsBase64,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
    minSymbols: 0,
  })
  @IsNotEmpty()
  password: string;

  @IsBase64()
  @IsOptional()
  profilePicture: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: RolesEnum;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsString()
  @IsOptional()
  address: string;
}
