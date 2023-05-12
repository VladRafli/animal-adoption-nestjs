import { IsNotEmpty, IsUUID } from 'class-validator';

export class RevokeTokenDto {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
