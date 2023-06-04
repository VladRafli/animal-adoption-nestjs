import { AuthModule } from '@/auth/auth.module';
import { mailConstants } from '@/_constants/mail.constants';
import { ms } from '@/_helper';
import { LocalStorageModule } from '@/_provider';
import { PrismaModule } from '@/_provider/prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from 'config/configuration';
import { AnimalsModule } from './animals/animals.module';
import { TokensModule } from './tokens/tokens.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { S3StorageModule } from './_provider/s3-storage/s3-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ThrottlerModule.forRoot({
      ttl: ms('1m'),
      limit: 10,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: mailConstants.mailUser,
          pass: mailConstants.mailPass,
        },
      },
    }),
    PrismaModule,
    LocalStorageModule,
    S3StorageModule,
    AuthModule,
    AnimalsModule,
    UsersModule,
    TransactionsModule,
    TokensModule,
  ],
})
export class AppModule {}
