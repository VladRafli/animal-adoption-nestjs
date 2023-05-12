import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTransactionsBodyDto {
  @IsUUID(4)
  @IsNotEmpty()
  animalId: string;
}
