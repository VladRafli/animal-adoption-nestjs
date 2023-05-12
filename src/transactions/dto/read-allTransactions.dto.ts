import { IsNumber, IsOptional } from 'class-validator';

export class ReadAllTransactionsDto {
  @IsNumber()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsOptional()
  take: number;
}
