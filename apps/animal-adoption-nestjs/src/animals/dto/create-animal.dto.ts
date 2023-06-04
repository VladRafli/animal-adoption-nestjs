import { AnimalType } from '@/_enum/AnimalType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalGender } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAnimalPhotoDto } from './create-animalPhoto.dto';

export class CreateAnimalDto {
  @IsEnum(AnimalType)
  @IsNotEmpty()
  @ApiProperty()
  type: AnimalType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsEnum(AnimalGender)
  @IsNotEmpty()
  @ApiProperty()
  gender: AnimalGender;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  breed: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  animalPhoto?: CreateAnimalPhotoDto[];
}
