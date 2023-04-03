import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './_provider/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AnimalsModule } from './animals/animals.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './_guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
