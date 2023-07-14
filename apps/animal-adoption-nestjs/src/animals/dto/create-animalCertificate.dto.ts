import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnimalCertificateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  filename: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsBase64()
  @IsNotEmpty()
  @ApiProperty()
  buffer: string;
}
