import { RolesEnum } from '@/_enum/RolesEnum.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateRegisterDto {
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

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumberString()
  number?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
