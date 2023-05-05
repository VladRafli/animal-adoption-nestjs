import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/_provider/prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { AnimalsModule } from './animals/animals.module';
import { LocalStorageModule } from './_provider/local-storage/local-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    MailerModule.forRoot({
      transport: {
        transport: 'mail.adoptme.my.id',
        defaults: {
          from: '"Adopt Me (Beta)" <no-reply@adoptme.my.id>',
        },
      },
    }),
    LocalStorageModule,
    AuthModule,
    AnimalsModule,
  ],
})
export class AppModule {}
