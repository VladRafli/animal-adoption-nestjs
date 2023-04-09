import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/_provider/prisma/prisma.module';
import { LocalStorageModule } from './_provider/local-storage/local-storage.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    LocalStorageModule,
    AuthModule,
    AnimalsModule,
  ],
})
export class AppModule {}
