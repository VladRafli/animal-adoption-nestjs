import { transactionStatusFlow } from '@/_constants';
import { RolesEnum, TransactionStatus } from '@/_enum';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TransactionGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body, params, user } = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();

    if (!params.id) {
      throw new BadRequestException('Request need transaction id.');
    }

    const transaction = await this.prismaService.adoptionTransaction.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!transaction) throw new BadRequestException('Transaction not found.');

    if (transaction.status === TransactionStatus.REQUEST_FINISHED)
      throw new BadRequestException('Transaction already finished.');

    if (transaction.status === TransactionStatus.REQUEST_CANCELLED)
      throw new BadRequestException('Transaction already cancelled.');

    if (user.role !== RolesEnum.ADMIN) {
      if (transaction.status === body.status)
        throw new BadRequestException('Cannot set status to same state.');

      if (
        transaction.status === TransactionStatus.REQUEST_RECIEVED &&
        body.status !== TransactionStatus.ON_REVIEW
      )
        throw new BadRequestException(
          'Cannot revert status to previous state or not jump to designated state.',
        );

      if (
        transaction.status === TransactionStatus.ON_REVIEW &&
        body.status !== TransactionStatus.WAITING_FOR_CONFIRMATION &&
        body.status !== TransactionStatus.REQUEST_CANCELLED &&
        body.status !== TransactionStatus.REQUEST_REJECTED
      )
        throw new BadRequestException(
          'Cannot revert status to previous state or not jump to designated state.',
        );

      if (
        transaction.status === TransactionStatus.WAITING_FOR_CONFIRMATION &&
        body.status !== TransactionStatus.ON_DELIVERY &&
        body.status !== TransactionStatus.REQUEST_CANCELLED
      )
        throw new BadRequestException(
          'Cannot revert status to previous state or not jump to designated state.',
        );

      if (
        transaction.status === TransactionStatus.ON_DELIVERY &&
        body.status !== TransactionStatus.REQUEST_FINISHED
      )
        throw new BadRequestException(
          'Cannot revert status to previous state or not jump to designated state.',
        );

      // This implementation is actualy good, but there still room for improvement.
      // Now its still not working due to some missing logic implementation.
      // See the implementation code to see what happened.
      // We have TransactionStatus to make sure the transaction state doesnt jump to not designated state.
      // But we only store the transaction status, not the transaction step like on "negotiation", "payment", "delivery", etc.
      // Transaction status only store the current state of the transaction, not the step.

      // const currentTransactionStep = transactionStatusFlow.findIndex((val) =>
      //   val.status.includes(TransactionStatus[transaction.status]),
      // );

      // const requestedTransactionStep = transactionStatusFlow.findIndex((val) =>
      //   val.status.includes(TransactionStatus[body.status]),
      // );

      // if (currentTransactionStep === -1 || requestedTransactionStep === -1)
      //   throw new BadRequestException('Invalid transaction status.');

      // if (
      //   requestedTransactionStep < currentTransactionStep ||
      //   requestedTransactionStep > currentTransactionStep + 1
      // )
      //   throw new BadRequestException(
      //     'Cannot revert status to previous state or not jump to state',
      //   );
    }

    return true;
  }
}
