import { TransactionStatus } from '@/_enum';
import { uuid } from '@/_helper';
import { PrismaService } from '@/_provider';
import { Injectable } from '@nestjs/common';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTransactionDto: CreateTransactionsDto) {
    return await this.prismaService.adoptionTransaction.create({
      data: {
        id: uuid.v4(),
        status: TransactionStatus.ON_REVIEW,
        ...createTransactionDto,
      },
    });
  }

  async findAll(skip: number, take: number) {
    return await this.prismaService.adoptionTransaction.findMany({
      skip,
      take,
    });
  }

  async findOne(id: string) {
    return await this.prismaService.adoptionTransaction.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionsDto) {
    return await this.prismaService.adoptionTransaction.update({
      data: {
        ...updateTransactionDto,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.adoptionTransaction.delete({
      where: {
        id,
      },
    });
  }
}
