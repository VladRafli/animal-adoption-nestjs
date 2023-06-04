import { PrismaModule, PrismaService } from '@/_provider';
import { JwtStrategy } from '@/_strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({})],
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, JwtStrategy],
})
export class TransactionsModule {}
