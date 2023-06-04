import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalPhotoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  filename: string;

  @IsBase64()
  @IsNotEmpty()
  @ApiProperty()
  buffer: string;
}
