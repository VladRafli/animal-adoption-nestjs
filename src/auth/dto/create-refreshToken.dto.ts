import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
