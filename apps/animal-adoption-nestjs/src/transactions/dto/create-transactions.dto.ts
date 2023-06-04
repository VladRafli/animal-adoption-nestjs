import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTransactionsDto {
  @IsUUID(4)
  @IsNotEmpty()
  animalId: string;

  @IsUUID(4)
  @IsNotEmpty()
  userId: string;
}
