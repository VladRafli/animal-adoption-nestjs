import { UserRole } from '@/_enum/UserRole.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
