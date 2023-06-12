import { TransactionStatus } from '@/_enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTransactionsDto {
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: string;
}
