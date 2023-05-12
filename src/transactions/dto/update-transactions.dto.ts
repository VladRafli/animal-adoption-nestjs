import { TransactionStatus } from '@/_enum';
import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateTransactionsDto } from './create-transactions.dto';

export class UpdateTransactionsDto extends PartialType(CreateTransactionsDto) {
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: string;
}
