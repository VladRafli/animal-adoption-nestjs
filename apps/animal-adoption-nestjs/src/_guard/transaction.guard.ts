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

    if (user.roles !== RolesEnum.ADMIN) {
      if (transaction.status === body.status)
        throw new BadRequestException('Cannot set status to same state.');

      const currentTransactionStep = transactionStatusFlow.findIndex((val) =>
        val.status.includes(TransactionStatus[transaction.status]),
      );

      const requestedTransactionStep = transactionStatusFlow.findIndex((val) =>
        val.status.includes(TransactionStatus[body.status]),
      );

      if (currentTransactionStep === -1 || requestedTransactionStep === -1)
        throw new BadRequestException('Invalid transaction status.');

      if (
        requestedTransactionStep < currentTransactionStep ||
        requestedTransactionStep > currentTransactionStep + 1
      )
        throw new BadRequestException(
          'Cannot revert status to previous state or not jump to state',
        );
    }

    return true;

    // const { session, headers } = context.switchToHttp().getRequest();

    // if (!session.user || !session.accessToken || !session.refreshToken)
    //   throw new UnauthorizedException();

    // if (session.accessToken !== headers.authorization.replace('Bearer ', ''))
    //   throw new UnauthorizedException();

    // const refreshToken = await this.prismaService.refreshToken.findFirst({
    //   where: {
    //     id: session.user.id,
    //   },
    // });

    // if (session.refreshToken !== refreshToken.token)
    //   throw new UnauthorizedException();

    // return true;
  }
}
